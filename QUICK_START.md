# 🚀 Quick Start Guide - Enhanced Admin Dashboard

## 🎯 Access the Admin Dashboard

1. **Open your browser** and go to: `http://localhost:5175`
2. **Click the User Icon** (👤) in the top-right corner
3. **Select "Staff Portal"** from the dropdown
4. **Enter your password** (from `.env.local` → `VITE_ADMIN_PASSWORD`)
5. **Click "Login"** → You'll be redirected to the admin dashboard

## ✨ New Features Overview

### 1. Image Upload 📸
```
Location: Add/Edit Work Modal
Button: "Choose File" (gradient accent button)
Process:
  1. Click "Choose File"
  2. Select image from your device
  3. Wait for upload (shows "Uploading...")
  4. Image automatically saved to Convex
  5. OR use "Image URL" field as fallback
```

### 2. Price Field 💰
```
Location: Add/Edit Work Modal
Field: "Price (INR)"
Display: Shows as emerald badge in table
Example: ₹2,500
Note: Optional - leave empty if not needed
```

### 3. Custom Fields 🏷️
```
Location: Add/Edit Work Modal (bottom section)
Fields:
  - Custom Field 1 Label + Value
  - Custom Field 2 Label + Value

Examples:
  Label: "Fabric Type"     Value: "Pure Silk"
  Label: "Delivery Time"   Value: "5-7 Days"
  Label: "Work Type"       Value: "Hand Embroidery"
  Label: "Special Note"    Value: "Rush Order Available"
```

## 📋 Step-by-Step: Adding a New Work

### Method 1: With Image Upload
1. Click **"+ ADD NEW WORK"** button (top-right)
2. Select **Category** (Blouse/Salwar/Frock/Kids)
3. Enter **Price** (e.g., 2500)
4. Click **"Choose File"** and select photo
5. Enter **Title in English** (e.g., "Elegant Silk Blouse")
6. Enter **Title in Tamil** (e.g., "நேர்த்தியான பட்டு ஜாக்கெட்")
7. Enter **Descriptions** (both languages)
8. (Optional) Add **Custom Fields**:
   - Field 1: "Fabric" → "Pure Banarasi Silk"
   - Field 2: "Ready In" → "3-5 Days"
9. Click **"ARCHIVE PIECE"**
10. ✅ Success animation → Work added!

### Method 2: With Image URL
1. Click **"+ ADD NEW WORK"**
2. Select **Category** and enter **Price**
3. **Skip** the "Choose File" button
4. Enter **Image URL** in the "Or Enter Image URL" field
5. Continue with titles, descriptions, custom fields
6. Click **"ARCHIVE PIECE"**

## 🎨 UI Improvements You'll Notice

### Admin Dashboard:
- ✨ Beautiful gradient background (teal to amber)
- 📏 Huge, bold heading (7xl size)
- 🎯 Clear, large search bar
- 🏷️ Color-coded category filters
- 📊 Premium table with better spacing
- 💰 New price column with emerald badges
- 🖼️ Larger image thumbnails
- ✏️ Smooth hover effects on action buttons

### Add/Edit Modals:
- 📐 Larger modal size (max-w-5xl)
- 🎨 Teal-colored input backgrounds
- 📝 Bigger input fields (easier to read/type)
- 🏷️ Icons next to labels
- 🎯 Amber-colored custom fields section
- 🎉 Prominent success animation
- 📱 Fully responsive

### Text Visibility:
- **Before**: Small, hard to read
- **After**: Large, bold, crystal clear
- **Headings**: 7xl (72px) instead of 4xl
- **Table Text**: 2xl (24px) instead of sm
- **Labels**: Bold uppercase with icons
- **Inputs**: Larger font (16px base)

## 🎯 Quick Tips

### For Best Results:
1. **Image Size**: Use high-quality images (min 800x800px)
2. **Image Format**: JPG, PNG, or WebP
3. **Price**: Enter numbers only (e.g., 2500, not ₹2,500)
4. **Custom Fields**: Use short, clear labels
5. **Descriptions**: Keep concise but descriptive

### Keyboard Shortcuts:
- **Tab**: Navigate between fields
- **Enter**: Submit form (when in text input)
- **Esc**: Close modal (when focused)

## 🔍 Finding Works

### Search:
- Type in the search bar (top-right)
- Searches: Title (English/Tamil), Category
- Real-time filtering

### Filter:
- Click category pills (All/Blouse/Salwar/Frock/Kids)
- Instant filtering
- Combine with search for precision

## ✏️ Editing Works

1. **Hover** over any work row in the table
2. **Action buttons appear** on the right
3. Click **Edit icon** (pencil)
4. Modal opens with **all current data**
5. Make your changes
6. Click **"UPDATE PIECE"**
7. ✅ Success → Changes saved!

## 🗑️ Deleting Works

1. **Hover** over work row
2. Click **Delete icon** (trash)
3. **Confirm** deletion
4. Work removed from display (soft delete)

## 🚪 Logging Out

1. Click **Logout button** (top-right, red icon)
2. Session cleared
3. Redirected to home page

## 📱 Mobile Usage

All features work perfectly on mobile:
- Touch-friendly buttons (larger)
- Responsive table (scrollable)
- Easy file upload
- Smooth modals
- Clear text (even on small screens)

## 🎨 Ladies' Tailoring Categories

### Blouse:
- Traditional blouses
- Designer blouses
- Embroidered blouses
- Party wear blouses

### Salwar:
- Salwar kameez
- Churidar
- Anarkali
- Palazzo sets

### Frock:
- Party frocks
- Casual frocks
- Designer frocks
- Ethnic frocks

### Kids:
- Kids' frocks
- Kids' salwar
- Party wear
- Ethnic wear

## 🎯 Example Work Entry

```
Category: Blouse
Price: 3500
Image: [Upload from device]

Title (English): Royal Blue Silk Blouse with Zari Work
Title (Tamil): அரச நீல பட்டு ஜாக்கெட் சரிகை வேலைப்பாடுடன்

Description (English):
Exquisite royal blue silk blouse featuring intricate zari embroidery 
on the neckline and sleeves. Perfect for weddings and special occasions.

Description (Tamil):
கழுத்து மற்றும் கைகளில் நுணுக்கமான சரிகை தையல் கொண்ட அழகான 
அரச நீல பட்டு ஜாக்கெட். திருமணங்கள் மற்றும் சிறப்பு நிகழ்வுகளுக்கு ஏற்றது.

Custom Field 1:
Label: Fabric Type
Value: Pure Kanchipuram Silk

Custom Field 2:
Label: Delivery Time
Value: 5-7 Working Days
```

## 🎉 You're All Set!

Your admin dashboard is now a **premium portfolio management system**. Enjoy managing your beautiful ladies' tailoring works with style! 

---

**Need Help?** Check `ENHANCEMENT_SUMMARY.md` for detailed technical information.

**Server Running**: http://localhost:5175
**Admin Access**: Click User Icon → Staff Portal → Enter Password
