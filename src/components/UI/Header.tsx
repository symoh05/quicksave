import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showRefresh?: boolean;
  onRefresh?: () => void;
  isLoading?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  subtitle, 
  showRefresh = false, 
  onRefresh,
  isLoading = false 
}) => {
  return (
    <div className="sticky top-0 z-40 bg-whatsapp-green dark:bg-whatsapp-green shadow-md">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-white/80 mt-1">
              {subtitle}
            </p>
          )}
        </div>
        
        {showRefresh && onRefresh && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
            className="text-white hover:bg-white/10 border-white/20"
          >
            <RefreshCw 
              size={18} 
              className={cn(
                "transition-transform duration-300",
                isLoading && "animate-spin"
              )} 
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;