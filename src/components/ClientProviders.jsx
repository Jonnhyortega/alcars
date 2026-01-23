"use client";

import { useState, useEffect } from "react";
import ThemeProvider from "./ThemeProvider";
import SplashScreen from "./SplashScreen";

export default function ClientProviders({ children }) {
  const [loading, setLoading] = useState(true);

  // You might want to remove this artificial delay if SplashScreen handles it alone,
  // but SplashScreen has a built-in timer.
  // We can just render SplashScreen and children.
  // Or render children hidden until Splash is done? 
  // Usually better to render children so they hydrate in background.

  return (
    <ThemeProvider>
       <SplashScreen onFinish={() => setLoading(false)} />
       {/* We can hide the main content or just let it sit behind. 
           If the splash is 'fixed inset-0 z-[100]', it covers everything. 
           So we can render children immediately. */}
       <div className={loading ? "opacity-0 h-0 overflow-hidden" : "opacity-100 transition-opacity duration-700"}>
          {children}
       </div>
    </ThemeProvider>
  );
}
