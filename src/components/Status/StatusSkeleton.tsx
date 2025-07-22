import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const StatusSkeleton: React.FC = () => {
  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border">
      {/* Thumbnail Skeleton */}
      <div className="relative aspect-[3/4]">
        <Skeleton className="w-full h-full" />
        
        {/* Play button skeleton for some cards */}
        {Math.random() > 0.5 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Skeleton className="w-12 h-12 rounded-full" />
          </div>
        )}
        
        {/* Save button skeleton */}
        <div className="absolute top-2 right-2">
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
        
        {/* Type badge skeleton */}
        <div className="absolute bottom-2 left-2">
          <Skeleton className="w-16 h-5 rounded-full" />
        </div>
      </div>

      {/* Info Section Skeleton */}
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
};

export default StatusSkeleton;