import pkg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const { Pool } = pkg;

// Database configuration
const dbConfig = {
  host: 'cs48k4wskco0swgwwsg4s8sk',
  port: 5432,
  database: 'sitio_imc_production',
  user: 'sitio_imc_user',
  password: 'SitioIMC_DB_P@ssw0rd_2026_Secure!',
  ssl: false,
};

const pool = new Pool(dbConfig);

async function runMigration() {
  try {
    console.log('🚀 Starting database migration...');
    
    // Read the migration SQL file
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const migrationPath = path.join(__dirname, 'migrate-simple.sql');
    
    if (!fs.existsSync(migrationPath)) {
      throw new Error('Migration file not found: ' + migrationPath);
    }
    
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    console.log('📄 Migration file loaded, size:', migrationSQL.length, 'characters');
    
    // Execute the migration
    console.log('📊 Executing migration script...');
    const client = await pool.connect();
    
    try {
      await client.query(migrationSQL);
      console.log('✅ Migration executed successfully');
    } finally {
      client.release();
    }
    
    // Verify the migration
    const verificationQuery = `
      SELECT 'services' as table_name, count(*) as record_count FROM services
      UNION ALL
      SELECT 'projects', count(*) FROM projects
      UNION ALL
      SELECT 'testimonials', count(*) FROM testimonials
      UNION ALL
      SELECT 'clients', count(*) FROM clients
      UNION ALL
      SELECT 'contact_info', count(*) FROM contact_info
      UNION ALL
      SELECT 'site_settings', count(*) FROM site_settings
      UNION ALL
      SELECT 'site_stats', count(*) FROM site_stats
      UNION ALL
      SELECT 'certifications', count(*) FROM certifications
      UNION ALL
      SELECT 'email_settings', count(*) FROM email_settings
      UNION ALL
      SELECT 'site_images', count(*) FROM site_images
      UNION ALL
      SELECT 'color_schemes', count(*) FROM color_schemes;
    `;
    
    const verification = await pool.query(verificationQuery);
    
    console.log('✅ Migration completed successfully!');
    console.log('📋 Migration results:');
    verification.rows.forEach(row => {
      console.log(`  ${row.table_name}: ${row.record_count} records`);
    });
    
    await pool.end();
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

runMigration();