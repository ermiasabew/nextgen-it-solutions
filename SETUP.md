# 🚀 Server Setup Guide

This guide will help you set up the local server with database for NextGen IT Solutions website.

## 📋 Prerequisites

Before starting, make sure you have:
- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

To check if you have Node.js installed:
```bash
node --version
npm --version
```

## 🔧 Installation Steps

### Step 1: Install Dependencies

Open your terminal/command prompt in the project folder and run:

```bash
npm install
```

This will install all required packages:
- `express` - Web server framework
- `sqlite3` - Database
- `body-parser` - Parse request data
- `cors` - Enable cross-origin requests
- `bcrypt` - Password encryption
- `nodemon` - Auto-restart server (development)

### Step 2: Start the Server

**Option A: Production Mode**
```bash
npm start
```

**Option B: Development Mode (auto-restart on changes)**
```bash
npm run dev
```

### Step 3: Access the Website

Once the server is running, open your browser and go to:

- **Main Website:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin

## 🗄️ Database Information

### Database File
- **Location:** `nextgen.db` (created automatically)
- **Type:** SQLite (file-based, no separate database server needed)

### Database Tables

1. **admin_users** - Admin login credentials
2. **website_content** - Hero, About, Contact sections
3. **services** - All services with icons and items
4. **testimonials** - Client testimonials
5. **faq** - Frequently asked questions
6. **contact_submissions** - Contact form submissions

### Default Admin Credentials
- **Username:** `admin`
- **Password:** `admin123`

⚠️ **Important:** Change these credentials immediately after first login!

## 📡 API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/admin/change-password` - Change admin credentials

### Content Management
- `GET /api/content` - Get all website content
- `POST /api/content/save` - Save content section

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Add new service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `POST /api/testimonials` - Add testimonial
- `PUT /api/testimonials/:id` - Update testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial

### FAQ
- `GET /api/faq` - Get all FAQ
- `POST /api/faq` - Add FAQ
- `PUT /api/faq/:id` - Update FAQ
- `DELETE /api/faq/:id` - Delete FAQ

### Contact Form
- `POST /api/contact/submit` - Submit contact form
- `GET /api/contact/submissions` - Get all submissions (admin)
- `PUT /api/contact/submissions/:id` - Update submission status
- `DELETE /api/contact/submissions/:id` - Delete submission

## 🔒 Security Features

✅ **Password Hashing** - Passwords encrypted with bcrypt
✅ **SQL Injection Protection** - Parameterized queries
✅ **CORS Enabled** - Cross-origin resource sharing
✅ **Input Validation** - Server-side validation

## 🛠️ Troubleshooting

### Problem: "npm: command not found"
**Solution:** Install Node.js from https://nodejs.org/

### Problem: "Port 3000 already in use"
**Solution:** 
1. Stop other applications using port 3000
2. Or change the port in `server.js`:
   ```javascript
   const PORT = 3001; // Change to any available port
   ```

### Problem: "Cannot find module 'express'"
**Solution:** Run `npm install` again

### Problem: Database errors
**Solution:** 
1. Delete `nextgen.db` file
2. Restart the server (database will be recreated)

### Problem: Admin login not working
**Solution:**
1. Check console for errors
2. Verify database was created
3. Try default credentials: admin/admin123

## 📊 Viewing Database Content

### Option 1: Using DB Browser for SQLite
1. Download [DB Browser for SQLite](https://sqlitebrowser.org/)
2. Open `nextgen.db` file
3. Browse tables and data

### Option 2: Using Command Line
```bash
sqlite3 nextgen.db
.tables
SELECT * FROM admin_users;
.exit
```

## 🌐 Deployment to Production

### For Local Network Access:
Change server.js:
```javascript
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://YOUR_IP:${PORT}`);
});
```

### For Cloud Hosting:
1. **Heroku:** Add `Procfile` with `web: node server.js`
2. **DigitalOcean:** Use PM2 process manager
3. **AWS:** Deploy on EC2 or Elastic Beanstalk
4. **Vercel/Netlify:** Use serverless functions

### Environment Variables:
Create `.env` file:
```
PORT=3000
NODE_ENV=production
DATABASE_PATH=./nextgen.db
```

## 📝 Backup Database

### Manual Backup:
Simply copy the `nextgen.db` file to a safe location

### Automated Backup Script:
```bash
# Windows
copy nextgen.db backups\nextgen_%date%.db

# Linux/Mac
cp nextgen.db backups/nextgen_$(date +%Y%m%d).db
```

## 🔄 Updating the Server

1. Stop the server (Ctrl+C)
2. Pull latest changes
3. Run `npm install` (if dependencies changed)
4. Restart server with `npm start`

## 📞 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure Node.js version is 14+
4. Check if port 3000 is available

## 🎯 Next Steps

1. ✅ Install dependencies
2. ✅ Start the server
3. ✅ Access admin panel
4. ✅ Change default password
5. ✅ Customize website content
6. ✅ Test contact form
7. ✅ Backup database regularly

---

**Server Status Indicators:**
- ✅ Green checkmarks = Success
- ⚠️ Yellow warnings = Check configuration
- ❌ Red errors = Fix required

**Happy coding! 🚀**
