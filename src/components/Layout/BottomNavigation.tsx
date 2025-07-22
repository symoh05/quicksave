import React from 'react';
import { Home, Download, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavigationProps {
  activeTab: 'home' | 'saved' | 'settings';
  onTabChange: (tab: 'home' | 'saved' | 'settings') => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home' as const, label: 'Statuses', icon: Home },
    { id: 'saved' as const, label: 'Saved', icon: Download },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-whatsapp-light-bg dark:bg-card border-t border-border z-50">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200",
                "min-w-[64px] space-y-1",
                isActive 
                  ? "text-whatsapp-green bg-whatsapp-green/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
              aria-label={tab.label}
            >
              <IconComponent 
                size={22} 
                className={cn(
                  "transition-all duration-200",
                  isActive && "scale-110"
                )} 
              />
              <span className={cn(
                "text-xs font-medium transition-all duration-200",
                isActive && "font-semibold"
              )}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;