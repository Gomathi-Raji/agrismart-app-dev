# Clerk Authentication Setup

## Step 1: Get Your Clerk Key
1. Sign up at https://go.clerk.com/lovable
2. Create a new application
3. Copy your `VITE_CLERK_PUBLISHABLE_KEY` from the dashboard

## Step 2: Update main.tsx
Once you have your key, update `src/main.tsx` with:

```typescript
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.tsx";
import "./index.css";

const PUBLISHABLE_KEY = "YOUR_CLERK_PUBLISHABLE_KEY_HERE";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>
);
```

Replace `YOUR_CLERK_PUBLISHABLE_KEY_HERE` with your actual key.

## Step 3: You're Done!
The navigation already includes Clerk authentication components. Users will be able to sign in/up and see their profile picture next to the voice input button.