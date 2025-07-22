import React, { memo } from 'react';
import { Status } from '@/contexts/StatusContext';
import StatusCard from './StatusCard';
import StatusSkeleton from './StatusSkeleton';

interface StatusGridProps {
  statuses: Status[];
  isLoading: boolean;
  onStatusClick: (status: Status) => void;
}

const StatusGrid: React.FC<StatusGridProps> = memo(({ statuses, isLoading, onStatusClick }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 p-4 pb-20">
        {Array.from({ length: 8 }).map((_, index) => (
          <StatusSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (statuses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-6xl mb-4">📱</div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No Statuses Found
        </h3>
        <p className="text-muted-foreground text-center max-w-sm">
          No WhatsApp statuses are available at the moment. Check back later or refresh to see new statuses.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 p-4 pb-20">
      {statuses.map((status) => (
        <StatusCard
          key={status.id}
          status={status}
          onClick={() => onStatusClick(status)}
        />
      ))}
    </div>
  );
});

StatusGrid.displayName = 'StatusGrid';

export default StatusGrid;