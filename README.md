# Real-Time Chat Frontend

A modern, responsive chat application frontend built with **React**, **TypeScript**, **Tailwind CSS**, and **Vite**. Features real-time messaging, user authentication, online status, and beautiful UI components.

## 🚀 Features

- **Real-time Messaging**: WebSocket-based instant message delivery
- **JWT Authentication**: Secure login/registration with token management
- **Online Status**: Real-time user presence indicators
- **Message Read Receipts**: Visual indicators when messages are read
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Type Safety**: Full TypeScript support
- **Modern UI**: Clean, intuitive interface with Lucide React icons
- **State Management**: React Context for global state
- **Route Protection**: Protected routes for authenticated users

## 🛠 Tech Stack

### Core Technologies
- **React 18** - UI library with latest features
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing

### State & Data
- **Axios** - HTTP client for API calls
- **WebSocket API** - Native browser WebSocket for real-time communication
- **React Context** - Global state management (auth, theme, etc.)

### UI & Icons
- **Lucide React** - Beautiful, consistent icons
- **Tailwind CSS** - Responsive design and utilities

## 📋 Prerequisites

- Node.js 16.0 or higher
- npm, yarn, or pnpm
- Backend API running (FastAPI chat backend)

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd chat-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_WS_BASE_URL=ws://localhost:8000/api/v1
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🏗 Project Structure

```
chat-frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Basic UI components (Button, Input, etc.)
│   │   ├── auth/          # Authentication components
│   │   └── chat/          # Chat-specific components
│   ├── contexts/          # React Context providers
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   ├── services/          # API and WebSocket services
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main App component
│   └── main.tsx           # Application entry point
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.ts         # Vite configuration
└── package.json
```

## 🎨 Component Overview

### UI Components
- **Button** - Customizable button with variants
- **Input** - Form input with validation states
- **MessageBubble** - Chat message display component
- **MessageInput** - Message composition input

### Auth Components
- **LoginForm** - User login form
- **RegisterForm** - User registration form

### Chat Components
- **ChatWindow** - Main chat interface
- **UsersList** - Online users sidebar
- **MessageBubble** - Individual message display

### Pages
- **Login** - Authentication page
- **Register** - User registration page
- **Chat** - Main chat application

## 🔌 API Integration

### Authentication Service
```typescript
// Login
await authService.login({ username, password });

// Register
await authService.register({ username, email, password });

// Logout
authService.logout();
```

### Chat Service
```typescript
// Get conversation history
await chatService.getConversation(otherUser, skip, limit);

// Mark message as read
await chatService.markAsRead(messageUuid);
```

### WebSocket Service
```typescript
// Connect to WebSocket
websocketService.connect(token);

// Send message
websocketService.sendMessage({
  type: "message",
  data: { content, receiver }
});

// Listen for messages
websocketService.onMessage((message) => {
  // Handle incoming message
});
```

## 🎯 Key Features Implementation

### Real-time Messaging
```typescript
// WebSocket connection management
useEffect(() => {
  if (user) {
    const token = localStorage.getItem('access_token');
    websocketService.connect(token);
  }

  return () => {
    websocketService.disconnect();
  };
}, [user]);
```

### Authentication Flow
```typescript
// Protected routes
<ProtectedRoute>
  <Chat />
</ProtectedRoute>

// Public routes (redirect if authenticated)
<PublicRoute>
  <Login />
</PublicRoute>
```

### Online Status
```typescript
// Track user online status
websocketService.onUserStatus((data) => {
  updateUserStatus(data.user_id, data.status);
});
```

## 🎨 Styling with Tailwind CSS

### Configuration
**tailwind.config.js**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom colors, fonts, etc.
    },
  },
  plugins: [],
}
```

### Custom Components
```tsx
// Custom button variants
<Button variant="primary" size="lg">
  Send Message
</Button>

<Button variant="outline" size="sm">
  Cancel
</Button>
```

## 🔒 Security Features

- **J Token Storage** - Secure token management
- **Route Protection** - Automatic redirect for unauthenticated users
- **Input Validation** - Form validation with error states
- **CORS Configuration** - Proper API communication

## 📱 Responsive Design

The application is built with a mobile-first approach:

```tsx
// Responsive layout example
<div className="flex flex-col md:flex-row h-screen">
  {/* Sidebar - hidden on mobile */}
  <div className="hidden md:block w-80 bg-white border-r">
    <UsersList />
  </div>
  
  {/* Main chat area */}
  <div className="flex-1 flex flex-col">
    <ChatWindow />
  </div>
</div>
```

## 🚀 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Type checking
npx tsc --noEmit
```

## 🌐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8000/api/v1` |
| `VITE_WS_BASE_URL` | WebSocket base URL | `ws://localhost:8000/api/v1` |

## 🔧 Configuration

### Vite Configuration
**vite.config.ts**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
```

### TypeScript Configuration
**tsconfig.json**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## 🧪 Testing

### Component Testing
```bash
# Install testing dependencies
npm install -D @testing-library/react @testing-library/jest-dom vitest

# Run tests
npm test
```

### Example Test
```typescript
import { render, screen } from '@testing-library/react'
import { LoginForm } from '../components/auth/LoginForm'

test('renders login form', () => {
  render(<LoginForm />)
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
})
```

## 📦 Building for Production

### 1. Build the Application
```bash
npm run build
```

### 2. Preview Production Build
```bash
npm run preview
```

### 3. Deploy
The `dist` folder contains the production-ready static files that can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 🐛 Troubleshooting

### Common Issues

1. **WebSocket Connection Failed**
   ```bash
   # Check if backend is running
   # Verify VITE_WS_BASE_URL in .env
   # Check browser console for CORS errors
   ```

2. **API Calls Failing**
   ```bash
   # Verify VITE_API_BASE_URL in .env
   # Check if JWT token is valid
   # Ensure backend CORS is configured
   ```

3. **Styles Not Loading**
   ```bash
   # Check Tailwind CSS configuration
   # Verify @tailwind directives in index.css
   # Restart development server
   ```

4. **TypeScript Errors**
   ```bash
   # Run type checking
   npx tsc --noEmit
   
   # Check for missing types
   npm install -D @types/package-name
   ```

### Development Tips

1. **Hot Reload Issues**
   ```bash
   # Clear Vite cache
   rm -rf node_modules/.vite
   npm run dev
   ```

2. **Dependency Issues**
   ```bash
   # Clear and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write responsive components
- Add proper TypeScript types
- Include error handling

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing UI library
- **Vite Team** - For the fast build tool
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide** - For the beautiful icons
- **FastAPI Backend** - For the robust API ([realtime-chat-api](https://github.com/abidaqureshi/realtime-chat-api))

---

**Happy Chatting!** 💬✨

## 📞 Support

If you encounter any issues or have questions:

1. Check the browser console for errors
2. Verify all environment variables are set
3. Ensure the backend API is running
4. Review the network tab in developer tools

For additional help, please open an issue in the repository.
