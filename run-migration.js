#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import pkg from 'pg';
const { Client } = pkg;

// Database configuration
const dbConfig = {
  host: 'cs48k4wskco0swgwwsg4s8sk',
  port: 5432,
  database: 'sitio_imc_production',
  user: 'sitio_imc_user',
  password: 'SitioIMC_DB_P@ssw0rd_2026_Secure!',
  ssl: false
};

async function runMigration() {
  const client = new Client(dbConfig);
  
  try {
    console.log('🔄 Connecting to PostgreSQL database...');
    await client.connect();
    console.log('✅ Connected to database successfully');

    // Read the migration SQL file
    console.log('📖 Reading migration script...');
    const migrationSQL = fs.readFileSync('./migrate-to-coolify-postgres.sql', 'utf8');
    
    console.log('🚀 Executing migration script...');
    console.log('⏳ This may take a few moments...');
    
    // Execute the migration
    const result = await client.query(migrationSQL);
    
    console.log('✅ Migration completed successfully!');
    
    // Verify the migration by checking table counts
    console.log('\n📊 Verifying migration results:');
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
    
    const verification = await client.query(verificationQuery);
    
    console.log('\n📋 Migration Summary:');
    console.log('┌─────────────────┬──────────────┐');
    console.log('│ Table Name      │ Record Count │');
    console.log('├─────────────────┼──────────────┤');
    
    verification.rows.forEach(row => {
      const tableName = row.table_name.padEnd(15);
      const count = row.record_count.toString().padStart(12);
      console.log(`│ ${tableName} │ ${count} │`);
    });
    
    console.log('└─────────────────┴──────────────┘');
    
    // Test a sample query
    console.log('\n🧪 Testing sample queries...');
    
    const servicesTest = await client.query('SELECT title FROM services WHERE active = true LIMIT 3');
    console.log('✅ Services query successful:', servicesTest.rows.map(r => r.title));
    
    const projectsTest = await client.query('SELECT title FROM projects WHERE active = true LIMIT 3');
    console.log('✅ Projects query successful:', projectsTest.rows.map(r => r.title));
    
    const colorSchemeTest = await client.query('SELECT name FROM color_schemes WHERE is_active = true LIMIT 1');
    console.log('✅ Active color scheme:', colorSchemeTest.rows[0]?.name || 'None');
    
    console.log('\n🎉 Database migration completed successfully!');
    console.log('📝 Next steps:');
    console.log('   1. Update application to use PostgreSQL instead of Supabase');
    console.log('   2. Remove Supabase environment variables');
    console.log('   3. Add PostgreSQL environment variables');
    console.log('   4. Test the application functionality');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('📋 Error details:', error);
    process.exit(1);
  } finally {
    await client.end();
    console.log('🔌 Database connection closed');
  }
}

// Run the migration
runMigration().catch(console.error);