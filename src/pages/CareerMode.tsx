import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CareerMode = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-primary p-6">
      <Button
        variant="ghost"
        className="text-white mb-6"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Menu
      </Button>
      <h1 className="text-3xl font-bold text-white">Career Mode</h1>
      <p className="text-muted mt-4">Coming soon...</p>
    </div>
  );
};

export default CareerMode;