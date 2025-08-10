import dotenv from 'dotenv';
import axios from 'axios';
import { readFile, readdir } from 'fs/promises';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function collectFiles(dir) {
    const files = [];
    
    async function scan(directory) {
        const entries = await readdir(directory, { withFileTypes: true });
        
        for (const entry of entries) {
            const fullPath = join(directory, entry.name);
            if (entry.isDirectory()) {
                await scan(fullPath);
            } else {
                const content = await readFile(fullPath);
                files.push({
                    path: relative(dir, fullPath),
                    content: content.toString('base64')
                });
            }
        }
    }
    
    await scan(dir);
    return files;
}

async function deployToCookify() {
    const apiUrl = process.env.VITE_API_URL?.trim();
    const apiToken = process.env.VITE_API_TOKEN?.trim();
    const projectId = process.env.VITE_PROJECT_ID?.trim();
    const buildDir = join(__dirname, 'dist');

    if (!apiUrl || !apiToken || !projectId) {
        console.error('Missing required environment variables');
        process.exit(1);
    }

    try {
        console.log('Starting deployment...');
        console.log(`API URL: ${apiUrl}`);
        
        const files = await collectFiles(buildDir);
        console.log(`Found ${files.length} files to deploy`);

        // Deploy to Coolify
        const response = await axios({
            method: 'POST',
            url: `${apiUrl}/api/applications/${projectId}/deploy`,
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json'
            },
            data: {
                type: 'static',
                files: files.map(file => ({
                    path: file.path,
                    content: file.content,
                    encoding: 'base64'
                })),
                settings: {
                    buildCommand: 'npm run build',
                    publishDirectory: 'dist',
                    installCommand: 'npm install',
                    framework: 'vite'
                },
                projectSettings: {
                    port: 8000,
                    nodeVersion: '18'
                }
            }
        });

        if (response.data.buildId) {
            console.log('Build started:', response.data.buildId);
            
            // Poll build status
            let buildStatus = 'pending';
            while (buildStatus === 'pending') {
                await new Promise(resolve => setTimeout(resolve, 5000));
                const statusResponse = await axios({
                    method: 'GET',
                    url: `${apiUrl}/api/applications/${projectId}/builds/${response.data.buildId}`,
                    headers: {
                        'Authorization': `Bearer ${apiToken}`
                    }
                });
                buildStatus = statusResponse.data.status;
                console.log(`Build status: ${buildStatus}`);
            }
        }

        console.log('Deployment successful:', response.data);
    } catch (error) {
        if (error.response) {
            console.error('Deployment failed:', {
                status: error.response.status,
                data: error.response.data,
                url: error.config?.url
            });
        } else {
            console.error('Deployment failed:', error.message);
        }
        process.exit(1);
    }
}

deployToCookify();