import { Button } from './ui/button';
import { ArrowLeft, RefreshCw } from 'lucide-react';

interface PostMatchActionsProps {
  onRematch: () => void;
  onBackToMenu: () => void;
  onNewMatch: () => void;
}

const PostMatchActions = ({ onRematch, onBackToMenu, onNewMatch }: PostMatchActionsProps) => {
  return (
    <div className="flex flex-col gap-2 mt-4">
      <Button onClick={onRematch} className="w-full">
        <RefreshCw className="w-4 h-4 mr-2" />
        Rematch
      </Button>
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" onClick={onBackToMenu}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Menu
        </Button>
        <Button variant="outline" onClick={onNewMatch}>
          New Match
        </Button>
      </div>
    </div>
  );
};

export default PostMatchActions;