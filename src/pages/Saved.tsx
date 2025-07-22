import React, { useState } from 'react';
import { Trash2, Share, FolderOpen } from 'lucide-react';
import Header from '@/components/UI/Header';
import StatusGrid from '@/components/Status/StatusGrid';
import StatusViewer from '@/components/Status/StatusViewer';
import { Button } from '@/components/ui/button';
import { useStatus, Status } from '@/contexts/StatusContext';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const Saved: React.FC = () => {
  const { savedStatuses, deleteStatus } = useStatus();
  const { toast } = useToast();
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
  const [statusToDelete, setStatusToDelete] = useState<Status | null>(null);

  const handleStatusClick = (status: Status) => {
    setSelectedStatus(status);
  };

  const handleDeleteClick = (status: Status, e: React.MouseEvent) => {
    e.stopPropagation();
    setStatusToDelete(status);
  };

  const confirmDelete = async () => {
    if (statusToDelete) {
      try {
        await deleteStatus(statusToDelete.id);
        toast({
          title: "Status Deleted",
          description: `${statusToDelete.fileName} has been removed from saved statuses.`,
        });
      } catch (error) {
        toast({
          title: "Delete Failed",
          description: "Failed to delete the status. Please try again.",
          variant: "destructive",
        });
      } finally {
        setStatusToDelete(null);
      }
    }
  };

  const handleShareAll = async () => {
    if (savedStatuses.length === 0) return;

    const statusList = savedStatuses.map(s => s.fileName).join('\n');
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Saved Statuses',
          text: `I have saved ${savedStatuses.length} statuses:\n${statusList}`,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      navigator.clipboard.writeText(statusList);
      toast({
        title: "List Copied",
        description: "Saved statuses list copied to clipboard.",
      });
    }
  };

  const formatStorageUsed = () => {
    const totalSize = savedStatuses.reduce((acc, status) => acc + status.size, 0);
    const mb = (totalSize / (1024 * 1024)).toFixed(1);
    return `${mb} MB`;
  };

  if (savedStatuses.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header
          title="Saved Statuses"
          subtitle="Your downloaded statuses"
        />
        
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="text-6xl mb-4">
            <FolderOpen size={64} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No Saved Statuses
          </h3>
          <p className="text-muted-foreground text-center max-w-sm mb-6">
            Start saving your favorite WhatsApp statuses and they'll appear here.
          </p>
          <Button 
            variant="outline" 
            onClick={() => window.location.hash = '#home'}
            className="border-whatsapp-green text-whatsapp-green hover:bg-whatsapp-green hover:text-white"
          >
            Browse Statuses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Saved Statuses"
        subtitle={`${savedStatuses.length} files • ${formatStorageUsed()} used`}
      />
      
      {/* Action Bar */}
      <div className="flex items-center justify-between p-4 bg-muted/30 border-b border-border">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {savedStatuses.length} saved
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShareAll}
            className="text-xs"
          >
            <Share size={14} className="mr-1" />
            Share All
          </Button>
        </div>
      </div>

      <main className="pb-16">
        <div className="grid grid-cols-2 gap-3 p-4">
          {savedStatuses.map((status) => (
            <div key={status.id} className="relative group">
              <div
                className="relative bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => handleStatusClick(status)}
              >
                {/* Thumbnail */}
                <div className="relative aspect-[3/4] bg-muted">
                  <img
                    src={status.thumbnail}
                    alt={status.fileName}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  
                  {/* Delete Button */}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={(e) => handleDeleteClick(status, e)}
                    className="absolute top-2 right-2 h-8 w-8 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                  >
                    <Trash2 size={14} />
                  </Button>

                  {/* Status Type Badge */}
                  <div className="absolute bottom-2 left-2">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-black/70 text-white backdrop-blur-sm">
                      {status.type === 'video' ? '📹' : '🖼️'} {status.type.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Status Info */}
                <div className="p-3 space-y-2">
                  <span className="text-sm font-medium text-foreground truncate block">
                    {status.fileName}
                  </span>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{((status.size / 1024) / 1024).toFixed(1)} MB</span>
                    <span>Saved</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <StatusViewer
        status={selectedStatus}
        isOpen={!!selectedStatus}
        onClose={() => setSelectedStatus(null)}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!statusToDelete} onOpenChange={() => setStatusToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Status?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{statusToDelete?.fileName}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Saved;