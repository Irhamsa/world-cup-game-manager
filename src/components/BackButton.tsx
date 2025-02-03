import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => navigate(-1)}
      className="absolute top-4 left-4 text-primary hover:bg-primary/10"
    >
      <ArrowLeft className="h-6 w-6" />
    </Button>
  );
};

export default BackButton;