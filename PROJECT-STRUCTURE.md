# 📂 Project Structure

Complete overview of all files and their purposes.

```
nextgen-it-solutions/
│
├── 🌐 WEBSITE FILES
│   ├── index.html              # Main website homepage
│   ├── styles.css              # Website styling
│   └── script.js               # Website functionality
│
├── 🔐 ADMIN PANEL FILES
│   ├── admin.html              # Admin dashboard interface
│   ├── admin-styles.css        # Admin panel styling
│   └── admin-script.js         # Admin panel functionality
│
├── 🖥️ SERVER FILES
│   ├── server.js               # Express server & API endpoints
│   ├── package.json            # Node.js dependencies
│   └── nextgen.db              # SQLite database (auto-created)
│
├── 🚀 SETUP FILES
│   ├── install.bat             # Windows installation script
│   ├── start-server.bat        # Windows server starter
│   └── .gitignore              # Git ignore rules
│
└── 📚 DOCUMENTATION
    ├── README.md               # Main documentation
    ├── SETUP.md                # Server setup guide
    ├── QUICKSTART.md           # Quick start guide
    └── PROJECT-STRUCTURE.md    # This file
```

---

## 📄 File Details

### 🌐 Website Files

#### `index.html` (Main Website)
- Complete single-page website
- Sections: Hero, About, Services, Why Choose Us, Testimonials, FAQ, Contact
- Responsive navigation
- Contact form with server integration
- SEO optimized meta tags

#### `styles.css` (Website Styles)
- Modern blue, black, white color scheme
- Responsive design (mobile-first)
- Smooth animations and transitions
- Custom scrollbar styling
- Professional card layouts

#### `script.js` (Website Functionality)
- Mobile navigation toggle
- FAQ accordion
- Contact form submission (with API)
- Smooth scrolling
- Scroll animations
- Active navigation highlighting
- Content loading from localStorage/API

---

### 🔐 Admin Panel Files

#### `admin.html` (Admin Dashboard)
- Password-protected login screen
- Sidebar navigation
- Content editing forms
- Dynamic item management
- Preview and save functionality

#### `admin-styles.css` (Admin Styles)
- Professional dashboard design
- Dark sidebar with light content area
- Responsive layout
- Form styling
- Toast notifications
- Card-based layouts

#### `admin-script.js` (Admin Logic)
- Login authentication
- Content management (CRUD operations)
- Services management
- Testimonials management
- FAQ management
- Settings management
- Password change functionality
- Data persistence (localStorage + API)

---

### 🖥️ Server Files

#### `server.js` (Backend Server)
**Port:** 3000 (configurable)

**Features:**
- Express.js web server
- SQLite database integration
- RESTful API endpoints
- Password hashing (bcrypt)
- CORS enabled
- Static file serving
- Error handling
- Graceful shutdown

**API Endpoints:**

**Authentication:**
- `POST /api/admin/login` - Admin login
- `POST /api/admin/change-password` - Update credentials

**Content:**
- `GET /api/content` - Get all content
- `POST /api/content/save` - Save content section

**Services:**
- `GET /api/services` - List all services
- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

**Testimonials:**
- `GET /api/testimonials` - List testimonials
- `POST /api/testimonials` - Create testimonial
- `PUT /api/testimonials/:id` - Update testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial

**FAQ:**
- `GET /api/faq` - List FAQ
- `POST /api/faq` - Create FAQ
- `PUT /api/faq/:id` - Update FAQ
- `DELETE /api/faq/:id` - Delete FAQ

**Contact:**
- `POST /api/contact/submit` - Submit form
- `GET /api/contact/submissions` - List submissions
- `PUT /api/contact/submissions/:id` - Update status
- `DELETE /api/contact/submissions/:id` - Delete submission

#### `package.json` (Dependencies)
**Production Dependencies:**
- `express` (^4.18.2) - Web framework
- `sqlite3` (^5.1.6) - Database
- `body-parser` (^1.20.2) - Parse requests
- `cors` (^2.8.5) - Cross-origin support
- `bcrypt` (^5.1.1) - Password encryption

**Development Dependencies:**
- `nodemon` (^3.0.1) - Auto-restart server

#### `nextgen.db` (Database)
**Type:** SQLite (file-based)
**Auto-created on first run**

**Tables:**
1. `admin_users` - Admin credentials
2. `website_content` - Content sections
3. `services` - Service listings
4. `testimonials` - Client reviews
5. `faq` - Questions & answers
6. `contact_submissions` - Form submissions

---

### 🚀 Setup Files

#### `install.bat` (Windows Installer)
- Checks Node.js installation
- Installs npm dependencies
- Shows success/error messages
- User-friendly interface

#### `start-server.bat` (Windows Server Starter)
- Starts Node.js server
- Shows server URL
- Displays admin credentials
- Easy one-click start

#### `.gitignore` (Git Ignore)
Excludes from version control:
- `node_modules/` - Dependencies
- `*.db` - Database files
- `.env` - Environment variables
- `logs/` - Log files
- OS-specific files

---

### 📚 Documentation Files

#### `README.md` (Main Documentation)
- Project overview
- Features list
- Admin panel guide
- Installation instructions
- Usage examples
- Troubleshooting

#### `SETUP.md` (Setup Guide)
- Prerequisites
- Installation steps
- Database information
- API documentation
- Security features
- Deployment guide
- Backup instructions

#### `QUICKSTART.md` (Quick Start)
- 3-minute setup guide
- Platform-specific instructions
- Common issues & fixes
- Pro tips

#### `PROJECT-STRUCTURE.md` (This File)
- Complete file overview
- File purposes
- Technical details
- Architecture explanation

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                   BROWSER                       │
│  ┌──────────────┐         ┌─────────────────┐  │
│  │   Website    │         │  Admin Panel    │  │
│  │ (index.html) │         │ (admin.html)    │  │
│  └──────┬───────┘         └────────┬────────┘  │
│         │                          │            │
└─────────┼──────────────────────────┼────────────┘
          │                          │
          │      HTTP Requests       │
          │                          │
┌─────────▼──────────────────────────▼────────────┐
│              EXPRESS SERVER                     │
│              (server.js)                        │
│  ┌──────────────────────────────────────────┐  │
│  │         API Routes & Middleware          │  │
│  │  • Authentication                        │  │
│  │  • Content Management                    │  │
│  │  • Form Handling                         │  │
│  └──────────────┬───────────────────────────┘  │
└─────────────────┼──────────────────────────────┘
                  │
                  │ SQL Queries
                  │
┌─────────────────▼──────────────────────────────┐
│           SQLite DATABASE                      │
│           (nextgen.db)                         │
│  ┌──────────────────────────────────────────┐  │
│  │  Tables:                                 │  │
│  │  • admin_users                           │  │
│  │  • website_content                       │  │
│  │  • services                              │  │
│  │  • testimonials                          │  │
│  │  • faq                                   │  │
│  │  • contact_submissions                   │  │
│  └──────────────────────────────────────────┘  │
└────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow

### Website Visitor Flow:
1. User visits `http://localhost:3000`
2. Server serves `index.html`
3. Browser loads `styles.css` and `script.js`
4. Content loads from API or localStorage
5. User submits contact form
6. Data sent to `/api/contact/submit`
7. Server saves to database
8. Success message displayed

### Admin User Flow:
1. Admin visits `http://localhost:3000/admin`
2. Server serves `admin.html`
3. Admin logs in via `/api/admin/login`
4. Server validates credentials from database
5. Admin edits content
6. Changes saved via API endpoints
7. Database updated
8. Main website reflects changes

---

## 📊 Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) |
| **Backend** | Node.js, Express.js |
| **Database** | SQLite3 |
| **Security** | bcrypt, CORS |
| **Icons** | Font Awesome 6.4.0 |
| **Architecture** | RESTful API, MVC Pattern |

---

## 🔐 Security Layers

1. **Password Hashing** - bcrypt with salt rounds
2. **SQL Injection Protection** - Parameterized queries
3. **CORS Configuration** - Controlled access
4. **Input Validation** - Server-side checks
5. **Session Management** - Secure authentication

---

## 📈 Scalability

### Current Setup (Small Business):
- ✅ Single server
- ✅ File-based database
- ✅ Local storage backup
- ✅ Up to 1000 contacts/month

### Future Scaling Options:
- 🔄 PostgreSQL/MySQL database
- 🔄 Redis caching
- 🔄 Load balancing
- 🔄 CDN for static files
- 🔄 Microservices architecture

---

## 🎯 Best Practices Implemented

✅ **Code Organization** - Separation of concerns
✅ **Error Handling** - Try-catch blocks, graceful failures
✅ **Responsive Design** - Mobile-first approach
✅ **SEO Optimization** - Meta tags, semantic HTML
✅ **Accessibility** - ARIA labels, keyboard navigation
✅ **Performance** - Minified assets, lazy loading
✅ **Security** - Input validation, password hashing
✅ **Documentation** - Comprehensive guides

---

**Last Updated:** November 2025
**Version:** 1.0.0
