// Social Media Table Migration Script
// Creates social_media table and adds default platforms

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./nextgen.db');

console.log('🔄 Adding social media management...\n');

// Create social media table
db.run(`CREATE TABLE IF NOT EXISTS social_media (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    platform TEXT UNIQUE NOT NULL,
    url TEXT NOT NULL,
    enabled INTEGER DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`, (err) => {
    if (err) {
        console.error('❌ Error creating table:', err.message);
        db.close();
        return;
    }
    
    console.log('✅ Social media table created');
    
    // Insert default social media links
    const defaultSocials = [
        { platform: 'facebook', url: 'https://facebook.com/nextgenit' },
        { platform: 'twitter', url: 'https://twitter.com/nextgenit' },
        { platform: 'linkedin', url: 'https://linkedin.com/company/nextgenit' },
        { platform: 'instagram', url: 'https://instagram.com/nextgenit' },
        { platform: 'telegram', url: 'https://t.me/nextgenit' },
        { platform: 'youtube', url: 'https://youtube.com/@nextgenit' }
    ];
    
    let completed = 0;
    
    defaultSocials.forEach(social => {
        db.run('INSERT OR IGNORE INTO social_media (platform, url) VALUES (?, ?)', 
            [social.platform, social.url],
            (err) => {
                if (err) {
                    console.error(`❌ Error adding ${social.platform}:`, err.message);
                } else {
                    console.log(`✅ Added ${social.platform}`);
                }
                
                completed++;
                
                if (completed === defaultSocials.length) {
                    console.log('\n' + '='.repeat(50));
                    console.log('✅ Social media migration completed!');
                    console.log('='.repeat(50));
                    console.log('\nDefault platforms added:');
                    console.log('  - Facebook');
                    console.log('  - Twitter');
                    console.log('  - LinkedIn');
                    console.log('  - Instagram');
                    console.log('  - Telegram');
                    console.log('  - YouTube');
                    console.log('\nYou can now:');
                    console.log('  1. Restart server: npm start');
                    console.log('  2. Go to admin panel');
                    console.log('  3. Click "Social Media"');
                    console.log('  4. Edit your social media links!\n');
                    db.close();
                }
            }
        );
    });
});
