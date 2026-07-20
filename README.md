# 💍 Wedding Invitation - Digital Premium Experience

A sophisticated, interactive digital wedding invitation platform built with Next.js 14, TypeScript, Supabase, and Tailwind CSS.

## ✨ Features

- 🎨 **Premium Design** - Elegant, modern UI inspired by luxury wedding branding
- 📱 **Fully Responsive** - Beautiful on desktop, tablet, and mobile
- ✉️ **Digital Invitations** - Send personalized invitation codes
- 📝 **Interactive RSVP** - Smooth, animated RSVP confirmation flow
- 🎬 **Micro-Animations** - Delightful, performance-optimized animations
- 🔐 **Secure** - Built with security best practices
- 📊 **Admin Dashboard** - Manage invitations and RSVPs
- 🌍 **SEO Optimized** - Built-in SEO metadata and structured data
- ♿ **Accessible** - WCAG 2.1 compliant
- 🚀 **Production Ready** - Optimized for performance and scalability

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database**: [Supabase](https://supabase.com/)
- **Auth**: [Supabase Auth](https://supabase.com/auth)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Zod](https://zod.dev/)
- **State**: [TanStack Query](https://tanstack.com/query/latest)
- **Icons**: [Heroicons](https://heroicons.com/)
- **UI Components**: Custom built with Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.17.0
- npm or pnpm
- Supabase account

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd wedding-invitation
```

2. **Install dependencies**

```bash
npm install
# or
pnpm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

Then edit `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WEDDING_DOMAIN=boda.midominio.com
```

4. **Set up the database**

Push the Supabase migrations:

```bash
npm run db:push
```

5. **Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
wedding-invitation/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/          # Reusable React components
│   │   ├── ui/              # Base UI components
│   │   ├── sections/        # Page sections
│   │   └── invitation/      # Invitation-specific components
│   ├── lib/                 # Utility libraries
│   │   ├── supabase/        # Supabase clients
│   │   ├── env.ts           # Environment validation
│   │   ├── constants.ts     # App constants
│   │   └── errors.ts        # Error classes
│   ├── utils/               # Helper functions
│   │   ├── formatting.ts
│   │   ├── validation.ts
│   │   ├── date.ts
│   │   ├── api-helpers.ts
│   │   └── animations.ts
│   ├── types/               # TypeScript type definitions
│   ├── styles/              # Global styles
│   │   ├── globals.css
│   │   ├── tokens.css
│   │   └── animations.css
│   └── hooks/               # Custom React hooks
├── public/                  # Static assets
├── .env.example             # Environment variables template
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── next.config.ts           # Next.js configuration
└── package.json             # Project dependencies
```

## 🎨 Design System

### Color Palette

- **Cream**: `#FBF8F3` - Primary background
- **Gold**: `#D4AF37` - Accent, highlights
- **Warm Beige**: `#D4B896` - Secondary
- **Sage**: `#A89968` - Tertiary
- **Terracotta**: `#A0704D` - Warm accent
- **Dark**: `#2D2D2D` - Text
- **Light**: `#F9F7F3` - Light backgrounds

### Typography

- **Headings**: Playfair Display (serif)
- **Body**: Lato (sans-serif)

### Spacing

Based on 4px scale: 4, 8, 12, 16, 24, 32, 48, 64, 80, 96px

## 🎬 Animation Guidelines

- **Fade In**: 0.6s ease-in-out
- **Slide Up**: 0.8s ease-out
- **Scale In**: 0.6s ease-out
- **Pulse Soft**: 2s infinite
- **Micro-interactions**: 0.3-0.5s

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Development Tools
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript
npm run format       # Format code with Prettier

# Database
npm run db:push      # Push migrations to Supabase
npm run db:pull      # Pull latest migrations from Supabase
```

## 🔐 Security

- Environment variables validated at startup
- Rate limiting for RSVP submissions
- SQL injection prevention with parameterized queries
- XSS protection with sanitization
- CSRF tokens for state-changing operations
- Content Security Policy headers

## ♿ Accessibility

- Semantic HTML
- ARIA labels and roles
- Keyboard navigation
- Focus management
- Color contrast compliance
- Screen reader support
- Motion preferences respected

## 📊 Performance

- Next.js Image Optimization
- CSS purging with Tailwind
- Tree shaking and code splitting
- Lazy loading components
- Optimized font loading
- Minified and compressed assets

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Node.js (Netlify, AWS, Heroku, etc.)

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Created with ❤️ for unforgettable wedding celebrations.

---

**Last Updated**: July 2026
