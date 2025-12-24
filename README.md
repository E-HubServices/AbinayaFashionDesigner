# ABI Fashion Designer Website

A premium, mobile-first bilingual showcase website for a super-senior tailor with 30+ years of experience.

## 🎯 Features

- **Bilingual Support**: Tamil (default) & English
- **Mobile-First Design**: Optimized for all devices
- **WhatsApp Integration**: Direct customer contact
- **AI Assistant**: Bilingual customer support
- **Admin Panel**: Password-protected work management
- **Premium UI**: Teal/gold color theme with smooth animations

## 🛠️ Tech Stack

- **Frontend**: React js, TypeScript, Tailwind CSS
- **Backend**: Convex
- **AI**: OpenAI GPT-4o
- **Styling**: Custom CSS with Noto Sans Tamil font
- **Icons**: Lucide React

## 📦 Installation

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   # Convex
   VITE_CONVEX_URL=your-convex-url-here

   # OpenAI API Key for AI Assistant
   VITE_OPENAI_API_KEY=your-openai-api-key-here

   # Admin Password (plain text - will be compared directly)
   VITE_ADMIN_PASSWORD=your-secure-password-here

   # WhatsApp Business Number
   VITE_WHATSAPP_NUMBER=918508092138
   ```

3. **Initialize Convex**:
   ```bash
   npx convex dev
   ```
   - Follow the prompts to create a new Convex project
   - Copy the deployment URL to `VITE_CONVEX_URL` in `.env.local`

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Admin Access

### Staff Login Process:
1. Click the **User icon** (👤) in the top-right corner of the navbar
2. Select **"Staff Portal"** from the dropdown menu
3. A secure login modal will appear
4. Enter the admin password (set in `.env.local` as `VITE_ADMIN_PASSWORD`)
5. Click **"Login"** to authenticate
6. Upon successful authentication, you'll be redirected to the admin dashboard

### Admin Dashboard Features:
- **View All Works**: See all portfolio pieces in a premium table layout
- **Add New Work**: Create new portfolio entries with bilingual content
- **Edit Works**: Update existing pieces with full form validation
- **Delete Works**: Remove works with confirmation dialog
- **Search & Filter**: Find specific works by category or search term
- **Secure Logout**: End your session and return to the home page

### Security Notes:
- Password is validated client-side (for demo purposes)
- Session is stored in `sessionStorage` (cleared on browser close)
- In production, implement server-side authentication via Convex actions

## 📱 Pages

- **Home (`/`)**: Hero, About, Featured Works, How It Works
- **Works (`/works`)**: Full gallery with category filtering
- **Admin (`/admin`)**: Work management (password-protected)

## 🎨 Design System

### Colors
- **Primary**: Teal (#14b8a6)
- **Accent**: Gold (#fbbf24)
- **Background**: Light teal gradient
- **Text**: Dark charcoal (#0f172a)

### Typography
- **Tamil**: Noto Sans Tamil
- **English**: Inter

## 🌐 Language Support

The website defaults to Tamil but includes a language toggle in the header. All content is stored bilingually in Convex.

## 📞 WhatsApp Integration

Customers can contact directly via WhatsApp with pre-filled messages including:
- Selected design
- Category
- Polite greeting in their preferred language

## 🤖 AI Assistant

### Customer Assistant
- Helps with design recommendations
- Answers questions about services
- Responds in Tamil or English

### Owner Assistant (Admin Mode)
- Translates between Tamil and English
- Suggests product descriptions
- Helps with content creation

## 🔒 Security

- Admin password validation via API route
- Session-based admin authentication
- No public data mutation
- Environment variable protection

## 📂 Project Structure

```
abi-fashion-website/
├── app/
│   ├── api/
│   │   └── validate-password/
│   ├── works/
│   ├── admin/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── FeaturedWorks.tsx
│   ├── WorkCard.tsx
│   ├── HowItWorks.tsx
│   ├── Footer.tsx
│   ├── ChatWidget.tsx
│   ├── AdminButton.tsx
│   └── ConvexClientProvider.tsx
├── contexts/
│   ├── LanguageContext.tsx
│   └── AdminContext.tsx
├── convex/
│   ├── schema.ts
│   ├── works.ts
│   ├── auth.ts
│   ├── ai.ts
│   └── chat.ts
├── lib/
│   ├── translations.ts
│   └── utils.ts
└── package.json
```

## 🚀 Deployment

### Vercel (Frontend)
```bash
vercel deploy
```

### Convex (Backend)
```bash
npx convex deploy
```

## 📝 Adding Works

1. Log in to admin panel
2. Click "Add New Work"
3. Fill in:
   - Category
   - Images
   - Title (Tamil & English)
   - Description (Tamil & English)
4. Save

## 🎯 Future Enhancements

- [ ] Payment integration
- [ ] Booking system
- [ ] Customer reviews
- [ ] Image gallery lightbox
- [ ] Social media integration
- [ ] Analytics dashboard

## 📄 License

© 2025 ABI Fashion Designer. All rights reserved.

## 👨‍💻 Developer

Built with ❤️ using Antigravity IDE

---

**Note**: This is a showcase website, not an e-commerce platform. All transactions happen via WhatsApp.
