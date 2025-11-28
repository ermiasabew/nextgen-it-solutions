const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const xl = require('excel4node');

const app = express();
const PORT = 3000;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: function (req, file, cb) {
        // Allow images, videos, and documents
        const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|pdf|doc|docx|txt/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only images, videos, and documents are allowed.'));
        }
    }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use('/uploads', express.static('uploads'));

// Initialize SQLite Database
const db = new sqlite3.Database('./nextgen.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('✅ Connected to SQLite database');
        initializeDatabase();
    }
});

// Create database tables
function initializeDatabase() {
    // Admin users table
    db.run(`CREATE TABLE IF NOT EXISTS admin_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Website content table
    db.run(`CREATE TABLE IF NOT EXISTS website_content (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        section TEXT NOT NULL,
        content TEXT NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Social media links table
    db.run(`CREATE TABLE IF NOT EXISTS social_media (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        platform TEXT UNIQUE NOT NULL,
        url TEXT NOT NULL,
        enabled INTEGER DEFAULT 1,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Insert default social media links if not exists
    const defaultSocials = [
        { platform: 'facebook', url: 'https://facebook.com/nextgenit' },
        { platform: 'twitter', url: 'https://twitter.com/nextgenit' },
        { platform: 'linkedin', url: 'https://linkedin.com/company/nextgenit' },
        { platform: 'instagram', url: 'https://instagram.com/nextgenit' },
        { platform: 'telegram', url: 'https://t.me/nextgenit' },
        { platform: 'youtube', url: 'https://youtube.com/@nextgenit' }
    ];

    defaultSocials.forEach(social => {
        db.run('INSERT OR IGNORE INTO social_media (platform, url) VALUES (?, ?)', 
            [social.platform, social.url]);
    });

    // Contact form submissions table
    db.run(`CREATE TABLE IF NOT EXISTS contact_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        service_type TEXT,
        support_type TEXT,
        business_location TEXT,
        attachments TEXT,
        status TEXT DEFAULT 'new',
        submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Services table
    db.run(`CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        icon TEXT NOT NULL,
        title TEXT NOT NULL,
        items TEXT NOT NULL,
        display_order INTEGER DEFAULT 0
    )`);

    // Testimonials table
    db.run(`CREATE TABLE IF NOT EXISTS testimonials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        position TEXT NOT NULL,
        text TEXT NOT NULL,
        rating INTEGER DEFAULT 5,
        video_url TEXT,
        video_type TEXT DEFAULT 'none',
        display_order INTEGER DEFAULT 0
    )`);

    // FAQ table
    db.run(`CREATE TABLE IF NOT EXISTS faq (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        display_order INTEGER DEFAULT 0
    )`);

    // Check if default admin exists, if not create one
    db.get('SELECT * FROM admin_users WHERE username = ?', ['admin'], async (err, row) => {
        if (!row) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            db.run('INSERT INTO admin_users (username, password) VALUES (?, ?)', 
                ['admin', hashedPassword], 
                (err) => {
                    if (err) {
                        console.error('Error creating default admin:', err);
                    } else {
                        console.log('✅ Default admin user created (username: admin, password: admin123)');
                    }
                }
            );
        }
    });

    console.log('✅ Database tables initialized');
}

// ==================== ROUTES ====================

// Serve main website
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve admin panel
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// ==================== ADMIN AUTH ====================

// Admin login
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;

    db.get('SELECT * FROM admin_users WHERE username = ?', [username], async (err, user) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        res.json({ 
            success: true, 
            message: 'Login successful',
            user: { id: user.id, username: user.username }
        });
    });
});

// Change admin password
app.post('/api/admin/change-password', async (req, res) => {
    const { currentUsername, newUsername, newPassword } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        db.run('UPDATE admin_users SET username = ?, password = ? WHERE username = ?',
            [newUsername, hashedPassword, currentUsername],
            function(err) {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Error updating credentials' });
                }
                res.json({ success: true, message: 'Credentials updated successfully' });
            }
        );
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error hashing password' });
    }
});

// ==================== WEBSITE CONTENT ====================

// Get all website content
app.get('/api/content', (req, res) => {
    const content = {};

    // Get website content
    db.all('SELECT * FROM website_content', (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        rows.forEach(row => {
            content[row.section] = JSON.parse(row.content);
        });

        // Get services
        db.all('SELECT * FROM services ORDER BY display_order', (err, services) => {
            if (err) services = [];
            content.services = services.map(s => ({
                id: s.id,
                icon: s.icon,
                title: s.title,
                items: JSON.parse(s.items)
            }));

            // Get testimonials
            db.all('SELECT * FROM testimonials ORDER BY display_order', (err, testimonials) => {
                if (err) testimonials = [];
                content.testimonials = testimonials;

                // Get FAQ
                db.all('SELECT * FROM faq ORDER BY display_order', (err, faq) => {
                    if (err) faq = [];
                    content.faq = faq;

                    res.json({ success: true, content });
                });
            });
        });
    });
});

// Save website content
app.post('/api/content/save', (req, res) => {
    const { section, content } = req.body;

    db.run(`INSERT OR REPLACE INTO website_content (id, section, content, updated_at) 
            VALUES ((SELECT id FROM website_content WHERE section = ?), ?, ?, CURRENT_TIMESTAMP)`,
        [section, section, JSON.stringify(content)],
        function(err) {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error saving content' });
            }
            res.json({ success: true, message: 'Content saved successfully' });
        }
    );
});

// ==================== SERVICES ====================

// Get all services
app.get('/api/services', (req, res) => {
    db.all('SELECT * FROM services ORDER BY display_order', (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        const services = rows.map(s => ({
            id: s.id,
            icon: s.icon,
            title: s.title,
            items: JSON.parse(s.items)
        }));
        res.json({ success: true, services });
    });
});

// Add service
app.post('/api/services', (req, res) => {
    const { icon, title, items } = req.body;

    db.run('INSERT INTO services (icon, title, items) VALUES (?, ?, ?)',
        [icon, title, JSON.stringify(items)],
        function(err) {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error adding service' });
            }
            res.json({ success: true, id: this.lastID, message: 'Service added' });
        }
    );
});

// Update service
app.put('/api/services/:id', (req, res) => {
    const { icon, title, items } = req.body;
    const { id } = req.params;

    db.run('UPDATE services SET icon = ?, title = ?, items = ? WHERE id = ?',
        [icon, title, JSON.stringify(items), id],
        function(err) {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error updating service' });
            }
            res.json({ success: true, message: 'Service updated' });
        }
    );
});

// Delete service
app.delete('/api/services/:id', (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM services WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error deleting service' });
        }
        res.json({ success: true, message: 'Service deleted' });
    });
});

// ==================== TESTIMONIALS ====================

// Get all testimonials
app.get('/api/testimonials', (req, res) => {
    db.all('SELECT * FROM testimonials ORDER BY display_order', (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.json({ success: true, testimonials: rows });
    });
});

// Add testimonial
app.post('/api/testimonials', (req, res) => {
    const { name, position, text, rating, video_url, video_type } = req.body;

    db.run('INSERT INTO testimonials (name, position, text, rating, video_url, video_type) VALUES (?, ?, ?, ?, ?, ?)',
        [name, position, text, rating, video_url || null, video_type || 'none'],
        function(err) {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error adding testimonial' });
            }
            res.json({ success: true, id: this.lastID, message: 'Testimonial added' });
        }
    );
});

// Update testimonial
app.put('/api/testimonials/:id', (req, res) => {
    const { name, position, text, rating, video_url, video_type } = req.body;
    const { id } = req.params;

    db.run('UPDATE testimonials SET name = ?, position = ?, text = ?, rating = ?, video_url = ?, video_type = ? WHERE id = ?',
        [name, position, text, rating, video_url || null, video_type || 'none', id],
        function(err) {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error updating testimonial' });
            }
            res.json({ success: true, message: 'Testimonial updated' });
        }
    );
});

// Delete testimonial
app.delete('/api/testimonials/:id', (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM testimonials WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error deleting testimonial' });
        }
        res.json({ success: true, message: 'Testimonial deleted' });
    });
});

// ==================== FAQ ====================

// Get all FAQ
app.get('/api/faq', (req, res) => {
    db.all('SELECT * FROM faq ORDER BY display_order', (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.json({ success: true, faq: rows });
    });
});

// Add FAQ
app.post('/api/faq', (req, res) => {
    const { question, answer } = req.body;

    db.run('INSERT INTO faq (question, answer) VALUES (?, ?)',
        [question, answer],
        function(err) {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error adding FAQ' });
            }
            res.json({ success: true, id: this.lastID, message: 'FAQ added' });
        }
    );
});

// Update FAQ
app.put('/api/faq/:id', (req, res) => {
    const { question, answer } = req.body;
    const { id } = req.params;

    db.run('UPDATE faq SET question = ?, answer = ? WHERE id = ?',
        [question, answer, id],
        function(err) {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error updating FAQ' });
            }
            res.json({ success: true, message: 'FAQ updated' });
        }
    );
});

// Delete FAQ
app.delete('/api/faq/:id', (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM faq WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error deleting FAQ' });
        }
        res.json({ success: true, message: 'FAQ deleted' });
    });
});

// ==================== CONTACT FORM ====================

// Submit contact form with file uploads
app.post('/api/contact/submit', upload.array('attachments', 5), (req, res) => {
    const { name, phone, email, message, service_type, support_type, business_location } = req.body;

    if (!name || !phone || !email || !message) {
        return res.status(400).json({ success: false, message: 'Name, phone, email, and message are required' });
    }

    // Process uploaded files
    const attachments = req.files ? req.files.map(file => ({
        filename: file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: file.path
    })) : [];

    const attachmentsJson = JSON.stringify(attachments);

    db.run(`INSERT INTO contact_submissions 
            (name, phone, email, message, service_type, support_type, business_location, attachments) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, phone, email, message, service_type || null, support_type || null, business_location || null, attachmentsJson],
        function(err) {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ success: false, message: 'Error submitting form' });
            }
            res.json({ 
                success: true, 
                message: 'Thank you! Your message has been received. We will contact you soon.',
                id: this.lastID 
            });
        }
    );
});

// Get all contact submissions (admin only)
app.get('/api/contact/submissions', (req, res) => {
    db.all('SELECT * FROM contact_submissions ORDER BY submitted_at DESC', (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.json({ success: true, submissions: rows });
    });
});

// Update submission status
app.put('/api/contact/submissions/:id', (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    db.run('UPDATE contact_submissions SET status = ? WHERE id = ?',
        [status, id],
        function(err) {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error updating status' });
            }
            res.json({ success: true, message: 'Status updated' });
        }
    );
});

// Delete submission
app.delete('/api/contact/submissions/:id', (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM contact_submissions WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error deleting submission' });
        }
        res.json({ success: true, message: 'Submission deleted' });
    });
});

// Export submissions to Excel
app.get('/api/contact/export-excel', (req, res) => {
    db.all('SELECT * FROM contact_submissions ORDER BY submitted_at DESC', (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        // Create a new workbook
        const wb = new xl.Workbook();
        const ws = wb.addWorksheet('Contact Submissions');

        // Define styles
        const headerStyle = wb.createStyle({
            font: {
                color: '#FFFFFF',
                size: 12,
                bold: true
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: '#0066CC'
            },
            alignment: {
                horizontal: 'center',
                vertical: 'center'
            }
        });

        const cellStyle = wb.createStyle({
            alignment: {
                wrapText: true,
                vertical: 'top'
            }
        });

        const dateStyle = wb.createStyle({
            numberFormat: 'yyyy-mm-dd hh:mm:ss',
            alignment: {
                vertical: 'top'
            }
        });

        // Define headers
        const headers = [
            { name: 'ID', width: 8 },
            { name: 'Name', width: 25 },
            { name: 'Phone', width: 20 },
            { name: 'Email', width: 30 },
            { name: 'Service Type', width: 20 },
            { name: 'Support Type', width: 20 },
            { name: 'Business Location', width: 25 },
            { name: 'Message', width: 50 },
            { name: 'Status', width: 15 },
            { name: 'Attachments', width: 15 },
            { name: 'Submitted At', width: 20 }
        ];

        // Write headers
        headers.forEach((header, index) => {
            ws.cell(1, index + 1)
                .string(header.name)
                .style(headerStyle);
            ws.column(index + 1).setWidth(header.width);
        });

        // Write data
        rows.forEach((row, rowIndex) => {
            const rowNum = rowIndex + 2;
            
            ws.cell(rowNum, 1).number(row.id).style(cellStyle);
            ws.cell(rowNum, 2).string(row.name || '').style(cellStyle);
            ws.cell(rowNum, 3).string(row.phone || '').style(cellStyle);
            ws.cell(rowNum, 4).string(row.email || '').style(cellStyle);
            ws.cell(rowNum, 5).string(row.service_type || 'N/A').style(cellStyle);
            ws.cell(rowNum, 6).string(row.support_type || 'N/A').style(cellStyle);
            ws.cell(rowNum, 7).string(row.business_location || 'N/A').style(cellStyle);
            ws.cell(rowNum, 8).string(row.message || '').style(cellStyle);
            ws.cell(rowNum, 9).string(row.status || 'new').style(cellStyle);
            
            // Attachments count
            const attachments = row.attachments ? JSON.parse(row.attachments) : [];
            ws.cell(rowNum, 10).string(attachments.length > 0 ? `${attachments.length} file(s)` : 'None').style(cellStyle);
            
            ws.cell(rowNum, 11).string(row.submitted_at || '').style(dateStyle);
        });

        // Generate Excel file
        const fileName = `contact-submissions-${Date.now()}.xlsx`;
        const filePath = path.join(__dirname, 'uploads', fileName);

        wb.write(filePath, (err) => {
            if (err) {
                console.error('Error writing Excel file:', err);
                return res.status(500).json({ success: false, message: 'Error generating Excel file' });
            }

            // Send file for download
            res.download(filePath, `NextGen-Contact-Submissions-${new Date().toISOString().split('T')[0]}.xlsx`, (err) => {
                if (err) {
                    console.error('Error sending file:', err);
                }
                // Delete file after sending
                fs.unlink(filePath, (unlinkErr) => {
                    if (unlinkErr) console.error('Error deleting temp file:', unlinkErr);
                });
            });
        });
    });
});

// ==================== SOCIAL MEDIA ====================

// Get all social media links
app.get('/api/social-media', (req, res) => {
    db.all('SELECT * FROM social_media ORDER BY platform', (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.json({ success: true, socials: rows });
    });
});

// Update social media link
app.put('/api/social-media/:platform', (req, res) => {
    const { platform } = req.params;
    const { url, enabled } = req.body;

    db.run('UPDATE social_media SET url = ?, enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE platform = ?',
        [url, enabled ? 1 : 0, platform],
        function(err) {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error updating social media' });
            }
            res.json({ success: true, message: 'Social media updated' });
        }
    );
});

// Add new social media platform
app.post('/api/social-media', (req, res) => {
    const { platform, url, enabled } = req.body;

    db.run('INSERT INTO social_media (platform, url, enabled) VALUES (?, ?, ?)',
        [platform, url, enabled ? 1 : 0],
        function(err) {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error adding social media' });
            }
            res.json({ success: true, id: this.lastID, message: 'Social media added' });
        }
    );
});

// Delete social media platform
app.delete('/api/social-media/:platform', (req, res) => {
    const { platform } = req.params;

    db.run('DELETE FROM social_media WHERE platform = ?', [platform], function(err) {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error deleting social media' });
        }
        res.json({ success: true, message: 'Social media deleted' });
    });
});

// ==================== SERVER START ====================

app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════╗
║                                                        ║
║   🚀 NextGen IT Solutions Server Running!             ║
║                                                        ║
║   📍 Main Website:    http://localhost:${PORT}           ║
║   🔐 Admin Panel:     http://localhost:${PORT}/admin    ║
║                                                        ║
║   Default Admin Login:                                ║
║   Username: admin                                     ║
║   Password: admin123                                  ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
    `);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err);
        } else {
            console.log('\n✅ Database connection closed');
        }
        process.exit(0);
    });
});
