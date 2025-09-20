# AgriSmart - Smart Agriculture Platform

![Logo](/public/lovable-uploads/logo.png)

A comprehensive digital agriculture platform that empowers farmers with smart tools, real-time weather data, crop disease detection, market analysis, and direct marketplace access. Built with modern web technologies and supporting multilingual capabilities.

## 🌟 Features

### 🌾 Core Agricultural Tools
- **Crop Disease Detection**: AI-powered image analysis for identifying plant diseases
- **Weather Monitoring**: Real-time weather data and forecasts for farming decisions
- **Market Analysis**: Live market prices and trends for agricultural products
- **Government Schemes**: Access to agricultural subsidies and government programs

### 🛒 Marketplace
- **Buy & Sell**: Direct farmer-to-consumer marketplace
- **Seller Panel**: Comprehensive dashboard for sellers to manage products
- **Smart Recommendations**: AI-powered product suggestions

### 🤖 Smart Features
- **AI Chatbot**: Intelligent farming assistant for queries and guidance
- **Multilingual Support**: Available in English and Tamil (தமிழ்)
- **Role-Based Access**: Different interfaces for farmers, buyers, and administrators
- **Mobile Responsive**: Optimized for all devices

### 👤 User Management
- **Secure Authentication**: Powered by Clerk authentication
- **User Profiles**: Personalized dashboards and settings
- **Admin Panel**: Administrative tools and analytics
- **Protected Routes**: Secure access to sensitive features

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: Clerk
- **State Management**: React Context API
- **Routing**: React Router DOM
- **API Integration**: TanStack Query
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Weather API**: OpenMeteo

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd agrismart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up authentication**
   - Sign up at [Clerk](https://go.clerk.com/lovable)
   - Create a new application
   - Copy your `VITE_CLERK_PUBLISHABLE_KEY`
   - Update `src/main.tsx` with your key (see [CLERK_SETUP.md](./CLERK_SETUP.md))

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── home/            # Home page sections
│   ├── layout/          # Layout components
│   └── ...
├── contexts/            # React contexts
│   ├── AuthContext.tsx  # Authentication context
│   └── LanguageContext.tsx  # Internationalization
├── hooks/               # Custom React hooks
├── pages/               # Application pages/routes
├── services/            # API services
├── data/                # Static data and translations
├── assets/              # Images and static assets
├── lib/                 # Utility libraries
└── utils/               # Utility functions
```

## 🌍 Internationalization

The application supports multiple languages:

- **English** (en) - Default
- **தமிழ் (Tamil)** (ta) - Complete translation

### Adding Translations
1. Add new keys to `src/data/translations.json`
2. Use the `useLanguage` hook in components:
   ```tsx
   import { useLanguage } from '@/contexts/LanguageContext';
   
   function MyComponent() {
     const { t } = useLanguage();
     return <h1>{t("section.title")}</h1>;
   }
   ```

See [README_TRANSLATION.md](./README_TRANSLATION.md) for detailed implementation guide.

## 🔑 Authentication Setup

This project uses Clerk for authentication. Follow these steps:

1. **Get your Clerk keys**
   - Sign up at [Clerk](https://go.clerk.com/lovable)
   - Create a new application
   - Copy your publishable key

2. **Configure the application**
   - Update `src/main.tsx` with your Clerk publishable key
   - The app includes pre-built auth components and protected routes

See [CLERK_SETUP.md](./CLERK_SETUP.md) for detailed setup instructions.

## 🎨 Styling and Theming

The project uses a design system approach:

- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality, accessible components
- **CSS Custom Properties**: Semantic color tokens
- **Dark/Light Mode**: Built-in theme switching

### Design System
- Colors are defined as HSL values in `src/index.css`
- Components use semantic tokens from `tailwind.config.ts`
- Custom variants available for different use cases

## 📱 Key Pages and Features

### 🏠 Home (`/`)
- Hero section with platform overview
- Feature highlights and statistics
- User testimonials and call-to-action

### 🌤️ Weather (`/weather`)
- Real-time weather data
- 7-day forecasts
- Agricultural weather insights

### 🔍 Diagnose (`/diagnose`)
- Crop disease detection using AI
- Image upload and analysis
- Treatment recommendations

### 📊 Market Analysis (`/market-analysis`)
- Live commodity prices
- Market trends and analytics
- Price prediction models

### 🛒 Marketplace (`/buy`)
- Product catalog with search and filters
- Direct farmer connections
- Secure transaction handling

### 👤 User Management
- `/auth` - Authentication pages
- `/profile` - User profile management
- `/admin` - Administrative dashboard

## 🔧 Configuration

### Environment Variables
The project doesn't use traditional env files. Instead:
- Clerk publishable key is set directly in `main.tsx`
- API endpoints are configured in service files
- Feature flags can be added to context providers

### API Integration
- Weather data: OpenMeteo API
- Authentication: Clerk
- Custom APIs can be added in `src/services/`

## 🚀 Deployment

### Custom Domain
1. Navigate to Project → Settings → Domains in Lovable
2. Connect your custom domain
3. Follow the DNS configuration instructions

### Other Platforms
The app can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

Build command: `npm run build`
Output directory: `dist`

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting (via ESLint config)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and patterns
- Use TypeScript for all new code
- Add proper error handling and loading states
- Test on both mobile and desktop
- Ensure accessibility standards are met

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Community**: [Discord](https://discord.com/channels/1119885301872070706/1280461670979993613)
- **Video Tutorials**: [YouTube Playlist](https://www.youtube.com/watch?v=9KHLTZaJcR8&list=PLbVHz4urQBZkJiAWdG8HWoJTdgEysigIO)

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev)
- UI components by [shadcn/ui](https://ui.shadcn.com)
- Weather data from [OpenMeteo](https://open-meteo.com)
- Authentication by [Clerk](https://clerk.com)

---

**Made with ❤️ for farmers and agricultural communities worldwide**
