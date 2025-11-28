# 📱 Social Media Management Guide

Complete guide to managing your company's social media links.

---

## 🎯 Feature Overview

Manage all your social media profiles from the admin panel. Links appear in the website footer and can be enabled/disabled individually.

### ✅ Supported Platforms:
- Facebook
- Twitter (X)
- LinkedIn
- Instagram
- Telegram
- YouTube
- TikTok
- WhatsApp
- GitHub
- Any custom platform

---

## 🚀 Quick Start

### Step 1: Access Admin Panel
```
http://localhost:3000/admin
```

### Step 2: Go to Social Media
- Click **"Social Media"** in the left sidebar

### Step 3: Edit Your Links
- Update URLs for each platform
- Enable/disable platforms
- Add new platforms
- Delete unused platforms

### Step 4: Save & View
- Changes save automatically
- View on website footer
- Links open in new tab

---

## 📝 How to Edit Social Media Links

### Edit Existing Platform:

1. **Find the platform** (e.g., Facebook)
2. **Update the URL** in the text field
3. **Changes save automatically**
4. **Check the website** to see updated link

### Example URLs:

**Facebook:**
```
https://facebook.com/yourcompany
https://fb.me/yourcompany
```

**Twitter (X):**
```
https://twitter.com/yourcompany
https://x.com/yourcompany
```

**LinkedIn:**
```
https://linkedin.com/company/yourcompany
https://linkedin.com/in/yourprofile
```

**Instagram:**
```
https://instagram.com/yourcompany
```

**Telegram:**
```
https://t.me/yourcompany
https://telegram.me/yourcompany
```

**YouTube:**
```
https://youtube.com/@yourcompany
https://youtube.com/c/yourcompany
https://youtube.com/channel/CHANNEL_ID
```

**WhatsApp:**
```
https://wa.me/251911234567
https://api.whatsapp.com/send?phone=251911234567
```

**TikTok:**
```
https://tiktok.com/@yourcompany
```

**GitHub:**
```
https://github.com/yourcompany
```

---

## 🎛️ Enable/Disable Platforms

### To Hide a Platform:
1. Uncheck the **"Enabled"** checkbox
2. Platform disappears from website
3. Link is saved but not shown

### To Show a Platform:
1. Check the **"Enabled"** checkbox
2. Platform appears on website
3. Visitors can click the link

### Use Cases:
- Hide platforms you don't use
- Temporarily disable during maintenance
- Show only active social media
- Test before making public

---

## ➕ Add New Platform

### Steps:

1. **Click "Add New Platform"** button
2. **Enter platform name** (e.g., "tiktok")
3. **Enter profile URL**
4. **Platform added** and enabled by default

### Supported Icons:
- facebook, twitter, linkedin, instagram
- telegram, youtube, tiktok, whatsapp
- github, pinterest, reddit, snapchat
- Any Font Awesome brand icon

### Custom Platforms:
You can add any platform! If no icon exists, a generic link icon will be used.

---

## 🗑️ Delete Platform

### Steps:

1. **Click "Delete" button** on platform card
2. **Confirm deletion**
3. **Platform removed** from database and website

### Warning:
Deletion is permanent! The platform will be completely removed.

---

## 🎨 How Links Appear on Website

### Footer Section:
```
Connect With Us
[Facebook] [Twitter] [LinkedIn] [Instagram] [Telegram]
```

### Features:
- Icons only (no text)
- Hover shows platform name
- Opens in new tab
- Professional styling
- Responsive on mobile

### Styling:
- Blue circular buttons
- White icons
- Hover effect (lighter blue)
- Smooth transitions
- Touch-friendly on mobile

---

## 📱 Platform-Specific Tips

### Facebook:
- Use your Page URL, not personal profile
- Format: facebook.com/yourpage
- Verify page is public

### Twitter (X):
- Use @username format
- Format: twitter.com/username
- No @ symbol in URL

### LinkedIn:
- Company page: linkedin.com/company/name
- Personal: linkedin.com/in/name
- Make profile public

### Instagram:
- Use business account
- Format: instagram.com/username
- Verify account if possible

### Telegram:
- Create public channel/group
- Format: t.me/channelname
- Share invite link

### YouTube:
- Use channel URL
- Format: youtube.com/@channelname
- Enable channel customization

### WhatsApp:
- Use business number
- Format: wa.me/countrycodephonenumber
- No + or spaces in number

---

## 🔧 Troubleshooting

### Links Not Showing on Website?

**Check:**
1. Platform is enabled (checkbox checked)
2. URL is valid and complete
3. Server is running
4. Refresh website (Ctrl+F5)

**Fix:**
- Enable the platform
- Add https:// to URL
- Restart server
- Clear browser cache

### Wrong Icon Showing?

**Check:**
1. Platform name is correct
2. Spelling matches exactly
3. Using lowercase

**Fix:**
- Edit platform name
- Use standard names (facebook, twitter, etc.)
- Delete and re-add if needed

### Link Goes to Wrong Page?

**Check:**
1. URL is complete
2. No typos in URL
3. Profile is public

**Fix:**
- Copy URL from browser
- Test URL in new tab
- Update in admin panel

### Changes Not Saving?

**Check:**
1. Server is running
2. Browser console for errors
3. Network connection

**Fix:**
- Restart server
- Check server logs
- Try different browser

---

## 💡 Best Practices

### URL Format:
- ✅ Use full URLs (https://...)
- ✅ Test links before saving
- ✅ Use official platform URLs
- ❌ Don't use shortened URLs
- ❌ Don't use redirect links

### Profile Setup:
- ✅ Use business/company accounts
- ✅ Verify accounts when possible
- ✅ Keep profiles updated
- ✅ Use consistent branding
- ✅ Make profiles public

### Maintenance:
- ✅ Check links monthly
- ✅ Update when URLs change
- ✅ Remove inactive platforms
- ✅ Add new platforms promptly
- ✅ Test on mobile devices

---

## 📊 Analytics Integration

### Track Social Media Clicks:

**Google Analytics:**
Add UTM parameters to URLs:
```
https://facebook.com/yourcompany?utm_source=website&utm_medium=footer&utm_campaign=social
```

**Benefits:**
- Track which platforms get clicks
- Measure social media ROI
- Optimize platform selection
- Understand audience preferences

---

## 🎯 Strategy Tips

### Which Platforms to Use:

**B2B Companies:**
- ✅ LinkedIn (essential)
- ✅ Twitter (important)
- ✅ Facebook (optional)
- ✅ YouTube (for content)

**B2C Companies:**
- ✅ Facebook (essential)
- ✅ Instagram (essential)
- ✅ TikTok (for younger audience)
- ✅ YouTube (for content)

**Tech Companies:**
- ✅ LinkedIn (essential)
- ✅ Twitter (essential)
- ✅ GitHub (if open source)
- ✅ YouTube (for tutorials)

**Local Businesses:**
- ✅ Facebook (essential)
- ✅ Instagram (essential)
- ✅ WhatsApp (for contact)
- ✅ Telegram (for updates)

---

## 🚀 Advanced Features

### Custom Platform Icons:

If you need a custom icon, you can:
1. Use Font Awesome icon name
2. Add to platformIcons in admin-script.js
3. Icon will appear automatically

### Multiple Accounts:

To add multiple accounts of same platform:
1. Use descriptive names (facebook-main, facebook-support)
2. Add both as separate platforms
3. Both will appear in footer

### Regional Accounts:

For different regions:
1. Add platform with region (facebook-us, facebook-et)
2. Customize per region
3. Show relevant links

---

## 📱 Mobile Optimization

### Mobile Features:
- Touch-friendly buttons
- Larger tap targets
- Responsive layout
- Fast loading
- Native app integration

### Testing:
- Test on actual devices
- Check all platforms
- Verify links open correctly
- Test in different browsers

---

## ✅ Checklist

### Initial Setup:
- [ ] Add all your social media URLs
- [ ] Test each link
- [ ] Enable active platforms
- [ ] Disable unused platforms
- [ ] Check website footer

### Monthly Maintenance:
- [ ] Verify all links work
- [ ] Update any changed URLs
- [ ] Add new platforms
- [ ] Remove inactive accounts
- [ ] Check mobile display

### When Launching New Platform:
- [ ] Create business account
- [ ] Verify account
- [ ] Add to admin panel
- [ ] Test link
- [ ] Announce to customers

---

## 🎓 Examples

### Tech Startup:
```
✅ LinkedIn: linkedin.com/company/techstartup
✅ Twitter: twitter.com/techstartup
✅ GitHub: github.com/techstartup
✅ YouTube: youtube.com/@techstartup
❌ Facebook: (disabled - not active)
```

### Local Business:
```
✅ Facebook: facebook.com/localbusiness
✅ Instagram: instagram.com/localbusiness
✅ WhatsApp: wa.me/251911234567
✅ Telegram: t.me/localbusiness
❌ LinkedIn: (disabled - B2C focus)
```

### IT Services Company:
```
✅ LinkedIn: linkedin.com/company/nextgenit
✅ Facebook: facebook.com/nextgenit
✅ Twitter: twitter.com/nextgenit
✅ Telegram: t.me/nextgenit
✅ YouTube: youtube.com/@nextgenit
```

---

## 📞 Support

### Need Help?
- Check URL format
- Test links in browser
- Verify platform is enabled
- Check server console

### Common Issues:
- Wrong URL format → Add https://
- Link not showing → Enable platform
- Wrong page → Update URL
- Icon missing → Check platform name

---

**Social media management is ready!** 📱

**Update your links now and connect with your audience!** 🚀

---

**Version:** 1.0.0  
**Last Updated:** November 2025  
**Feature:** Social Media Links Management
