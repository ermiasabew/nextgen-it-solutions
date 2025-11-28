# NextGen IT Solutions Website

A professional, modern website with a powerful admin panel for easy content management.

## 🚀 Features

- **Fully Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Modern UI/UX** - Clean blue, black, and white color scheme
- **SEO Optimized** - Meta tags and keywords for better search engine visibility
- **Admin Panel** - Easy-to-use interface to customize all content
- **Smooth Animations** - Professional scroll effects and transitions
- **Contact Form** - Functional contact form with validation

## 📁 Files Structure

```
├── index.html          # Main website
├── styles.css          # Website styles
├── script.js           # Website functionality
├── admin.html          # Admin panel (password protected)
├── admin-styles.css    # Admin panel styles
├── admin-script.js     # Admin panel functionality
└── README.md           # This file
```

## 🔐 Admin Panel Access

### How to Access Admin Panel

1. Open `admin.html` in your browser
2. Use the default credentials:
   - **Username:** `admin`
   - **Password:** `admin123`

### Admin Panel Features

The admin panel allows you to customize:

✅ **Hero Section**
- Main headline
- Sub-headline
- Button text and link

✅ **About Us**
- Section title and subtitle
- Company description paragraphs

✅ **Services**
- Add/Edit/Delete services
- Customize service icons
- Edit service items

✅ **Why Choose Us**
- Add/Edit/Delete reasons
- Customize icons and descriptions

✅ **Testimonials**
- Add/Edit/Delete client testimonials
- Set ratings (1-5 stars)

✅ **FAQ**
- Add/Edit/Delete questions and answers
- Accordion functionality

✅ **Contact Information**
- Phone number
- WhatsApp number
- Email address
- Office location

✅ **Website Settings**
- Company name
- Website title
- SEO meta description
- SEO keywords
- Change admin credentials

## 📝 How to Use Admin Panel

### Step 1: Login
1. Open `admin.html`
2. Enter your credentials
3. Click "Login"

### Step 2: Navigate Sections
- Use the left sidebar to navigate between different sections
- Each section has its own editing interface

### Step 3: Edit Content
- Simply type in the input fields to change content
- For services, testimonials, FAQ - use Add/Delete buttons
- All changes are saved locally in your browser

### Step 4: Save Changes
- Click the green "Save Changes" button at the top
- You'll see a success notification
- Click "Preview Website" to see your changes live

### Step 5: Change Admin Password (Optional)
1. Go to "Settings" section
2. Enter new username and password
3. Click "Update Credentials"
4. Your new credentials will be saved

## 🎨 Customization Tips

### Changing Icons
- Icons use Font Awesome classes
- Format: `fa-icon-name` (e.g., `fa-laptop`, `fa-shield-alt`)
- Browse icons at: https://fontawesome.com/icons

### Adding Services
1. Go to "Services" section in admin
2. Click "Add New Service"
3. Fill in the service details
4. Add service items (one per line)
5. Click "Save Changes"

### Managing Testimonials
1. Go to "Testimonials" section
2. Edit existing or add new testimonials
3. Set rating from 1-5 stars
4. Include client name and position

### Updating Contact Info
1. Go to "Contact Info" section
2. Update phone, WhatsApp, email
3. Edit office location
4. Save changes

## 🔒 Security Notes

- Admin credentials are stored in browser's localStorage
- Change default password immediately after first login
- Keep your credentials secure
- For production use, implement server-side authentication

## 🚀 Server & Database Setup

### Quick Start (3 Steps)

1. **Install Dependencies**
   ```bash
   npm install
   ```
   Or on Windows, double-click: `install.bat`

2. **Start Server**
   ```bash
   npm start
   ```
   Or on Windows, double-click: `start-server.bat`

3. **Access Website**
   - Main Site: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

### What's Included

✅ **Express Server** - Fast, lightweight web server
✅ **SQLite Database** - File-based database (no setup needed)
✅ **Contact Form Handler** - Saves submissions to database
✅ **Admin API** - RESTful API for content management
✅ **Password Encryption** - Secure bcrypt hashing
✅ **Auto-initialization** - Database tables created automatically

### Database Features

- **Contact Submissions** - All form submissions saved
- **Content Management** - Store all website content
- **Services** - Add/edit/delete services
- **Testimonials** - Manage client reviews
- **FAQ** - Manage questions and answers
- **Admin Users** - Secure authentication

### View Contact Submissions

Access the admin panel to view all contact form submissions with:
- Name, phone, email, message
- Submission date and time
- Status tracking (new, read, responded)

## 🌐 Deployment

### Local Network Access
Change `server.js` to listen on all interfaces:
```javascript
app.listen(PORT, '0.0.0.0', () => { ... });
```

### Production Hosting
- **Heroku** - Free tier available
- **DigitalOcean** - $5/month droplet
- **AWS EC2** - Free tier for 1 year
- **Railway** - Easy deployment

See `SETUP.md` for detailed deployment instructions.

## 📱 Browser Compatibility

- ✅ Chrome (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 💡 Tips for Best Results

1. **Keep Content Concise** - Short, impactful text works best
2. **Use High-Quality Icons** - Stick to Font Awesome for consistency
3. **Test on Mobile** - Always check how changes look on mobile devices
4. **Regular Backups** - Export your localStorage data periodically
5. **SEO Keywords** - Update keywords based on your target audience

## 🆘 Troubleshooting

**Q: Changes not showing on main website?**
- Make sure you clicked "Save Changes" in admin panel
- Refresh the main website page (Ctrl+F5 or Cmd+Shift+R)

**Q: Forgot admin password?**
- Open browser console (F12)
- Type: `localStorage.removeItem('adminCredentials')`
- Refresh admin page - default credentials will work again

**Q: Lost all content?**
- Content is stored in browser's localStorage
- If you clear browser data, content resets to default
- Always keep backups of important content

**Q: Admin panel not loading?**
- Check if JavaScript is enabled in your browser
- Try a different browser
- Clear browser cache and reload

## 📞 Support

For technical support or customization requests:
- Email: info@nextgenit.et
- Phone: +251 911 234 567
- WhatsApp: +251 911 234 567

## 📄 License

This website template is provided as-is for NextGen IT Solutions.

---

**Built with ❤️ for NextGen IT Solutions**
