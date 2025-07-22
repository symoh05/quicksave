import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { StatusProvider } from "@/contexts/StatusContext";
import BottomNavigation from "@/components/Layout/BottomNavigation";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'saved' | 'settings'>('home');

  const renderCurrentPage = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'saved':
        return <Saved />;
      case 'settings':
        return <Settings />;
      default:
        return <Home />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <StatusProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <div className="min-h-screen bg-background">
              {renderCurrentPage()}
              <BottomNavigation 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
              />
            </div>
          </TooltipProvider>
        </StatusProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
