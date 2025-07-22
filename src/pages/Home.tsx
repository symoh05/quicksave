import React, { useState, useEffect } from 'react';
import Header from '@/components/UI/Header';
import StatusGrid from '@/components/Status/StatusGrid';
import StatusViewer from '@/components/Status/StatusViewer';
import { useStatus, Status } from '@/contexts/StatusContext';

const Home: React.FC = () => {
  const { statuses, isLoading, fetchStatuses } = useStatus();
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

  useEffect(() => {
    fetchStatuses();
  }, [fetchStatuses]);

  const handleStatusClick = (status: Status) => {
    setSelectedStatus(status);
  };

  const handleRefresh = () => {
    fetchStatuses();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="QuickSave"
        subtitle={`${statuses.length} statuses available`}
        showRefresh
        onRefresh={handleRefresh}
        isLoading={isLoading}
      />
      
      <main className="pb-16">
        <StatusGrid
          statuses={statuses}
          isLoading={isLoading}
          onStatusClick={handleStatusClick}
        />
      </main>

      <StatusViewer
        status={selectedStatus}
        isOpen={!!selectedStatus}
        onClose={() => setSelectedStatus(null)}
      />
    </div>
  );
};

export default Home;