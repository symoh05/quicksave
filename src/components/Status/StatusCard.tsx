import React, { memo } from 'react';
import { Play, Download, Check } from 'lucide-react';
import { Status } from '@/contexts/StatusContext';
import { Button } from '@/components/ui/button';
import { useStatus } from '@/contexts/StatusContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface StatusCardProps {
  status: Status;
  onClick: () => void;
}

const StatusCard: React.FC<StatusCardProps> = memo(({ status, onClick }) => {
  const { saveStatus } = useStatus();
  const { toast } = useToast();

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (status.isSaved) {
      toast({
        title: "Already Saved",
        description: "This status is already in your saved collection.",
      });
      return;
    }

    try {
      await saveStatus(status);
      toast({
        title: "Status Saved",
        description: `${status.fileName} has been saved successfully.`,
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save the status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div 
      className="relative bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[3/4] bg-muted">
        <img
          src={status.thumbnail}
          alt={status.fileName}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Video Play Button */}
        {status.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/50 rounded-full p-3">
              <Play size={24} className="text-white ml-1" fill="white" />
            </div>
          </div>
        )}

        {/* Save Button */}
        <Button
          size="sm"
          onClick={handleSave}
          className={cn(
            "absolute top-2 right-2 h-8 w-8 rounded-full shadow-lg transition-all duration-200",
            "opacity-0 group-hover:opacity-100",
            status.isSaved 
              ? "bg-whatsapp-green hover:bg-whatsapp-green-dark text-white" 
              : "bg-white hover:bg-gray-100 text-gray-700"
          )}
        >
          {status.isSaved ? (
            <Check size={14} />
          ) : (
            <Download size={14} />
          )}
        </Button>

        {/* Status Type Badge */}
        <div className="absolute bottom-2 left-2">
          <span className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            "bg-black/70 text-white backdrop-blur-sm"
          )}>
            {status.type === 'video' ? '📹' : '🖼️'} {status.type.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Status Info */}
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground truncate">
            {status.fileName}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatFileSize(status.size)}</span>
          <span>{formatDate(status.timestamp)}</span>
        </div>
      </div>
    </div>
  );
});

StatusCard.displayName = 'StatusCard';

export default StatusCard;