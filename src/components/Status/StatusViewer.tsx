import React, { useState } from 'react';
import { X, Download, Share, MoreVertical } from 'lucide-react';
import { Status } from '@/contexts/StatusContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { useStatus } from '@/contexts/StatusContext';
import { useToast } from '@/hooks/use-toast';

interface StatusViewerProps {
  status: Status | null;
  isOpen: boolean;
  onClose: () => void;
}

const StatusViewer: React.FC<StatusViewerProps> = ({ status, isOpen, onClose }) => {
  const { saveStatus } = useStatus();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  if (!status) return null;

  const handleSave = async () => {
    if (status.isSaved) {
      toast({
        title: "Already Saved",
        description: "This status is already in your saved collection.",
      });
      return;
    }

    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'QuickSave Status',
          text: `Check out this status: ${status.fileName}`,
          url: status.fullUrl,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(status.fullUrl);
      toast({
        title: "Link Copied",
        description: "Status link has been copied to clipboard.",
      });
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 max-w-lg bg-background border-border max-h-[90vh] overflow-hidden">
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between p-4 border-b border-border">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground truncate">
              {status.fileName}
            </h3>
            <p className="text-sm text-muted-foreground">
              {formatFileSize(status.size)} • {formatDate(status.timestamp)}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </DialogHeader>

        {/* Media Content */}
        <div className="flex-1 overflow-auto">
          <div className="relative bg-black flex items-center justify-center min-h-[400px]">
            {status.type === 'image' ? (
              <img
                src={status.fullUrl}
                alt={status.fileName}
                className="max-w-full max-h-full object-contain"
                loading="lazy"
              />
            ) : (
              <video
                controls
                className="max-w-full max-h-full"
                poster={status.thumbnail}
              >
                <source src={status.fullUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-around p-4 border-t border-border bg-muted/30">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            disabled={isLoading || status.isSaved}
            className="flex-1 mx-1"
          >
            <Download size={16} className="mr-2" />
            {status.isSaved ? 'Saved' : isLoading ? 'Saving...' : 'Save'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="flex-1 mx-1"
          >
            <Share size={16} className="mr-2" />
            Share
          </Button>
          
          <Button variant="outline" size="sm" className="px-3">
            <MoreVertical size={16} />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StatusViewer;