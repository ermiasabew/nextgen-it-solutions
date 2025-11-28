// Database Migration Script
// Adds new columns to existing contact_submissions table

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./nextgen.db');

console.log('🔄 Starting database migration...\n');

// Check if columns exist and add them if they don't
const migrations = [
    {
        name: 'service_type',
        sql: `ALTER TABLE contact_submissions ADD COLUMN service_type TEXT`
    },
    {
        name: 'support_type',
        sql: `ALTER TABLE contact_submissions ADD COLUMN support_type TEXT`
    },
    {
        name: 'business_location',
        sql: `ALTER TABLE contact_submissions ADD COLUMN business_location TEXT`
    },
    {
        name: 'attachments',
        sql: `ALTER TABLE contact_submissions ADD COLUMN attachments TEXT`
    }
];

let completed = 0;
let errors = 0;

migrations.forEach((migration, index) => {
    db.run(migration.sql, (err) => {
        if (err) {
            if (err.message.includes('duplicate column name')) {
                console.log(`✅ Column '${migration.name}' already exists`);
            } else {
                console.error(`❌ Error adding '${migration.name}':`, err.message);
                errors++;
            }
        } else {
            console.log(`✅ Added column '${migration.name}'`);
        }
        
        completed++;
        
        if (completed === migrations.length) {
            console.log('\n' + '='.repeat(50));
            if (errors === 0) {
                console.log('✅ Migration completed successfully!');
            } else {
                console.log(`⚠️  Migration completed with ${errors} error(s)`);
            }
            console.log('='.repeat(50));
            console.log('\nYou can now restart your server with: npm start\n');
            db.close();
        }
    });
});
