import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';

const SideSelection = () => {
  const { selectedTeams, setPlayerSide } = useGame();

  if (!selectedTeams[0] || !selectedTeams[1]) return null;

  return (
    <div className="p-6 space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold mb-2">Choose Your Side</h2>
        <p className="text-muted-foreground">Select which team you want to control</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Button
          onClick={() => setPlayerSide('HOME')}
          className="p-6 h-auto flex flex-col items-center space-y-4"
          variant="outline"
        >
          <img 
            src={selectedTeams[0].flag} 
            alt={selectedTeams[0].name}
            className="w-16 h-16 object-cover rounded-full"
          />
          <div>
            <p className="font-bold">{selectedTeams[0].name}</p>
            <p className="text-sm text-muted-foreground">Play as Home Team</p>
          </div>
        </Button>

        <Button
          onClick={() => setPlayerSide('AWAY')}
          className="p-6 h-auto flex flex-col items-center space-y-4"
          variant="outline"
        >
          <img 
            src={selectedTeams[1].flag} 
            alt={selectedTeams[1].name}
            className="w-16 h-16 object-cover rounded-full"
          />
          <div>
            <p className="font-bold">{selectedTeams[1].name}</p>
            <p className="text-sm text-muted-foreground">Play as Away Team</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default SideSelection;