import { Music, Trophy, Users, PlayCircle, Save, Edit3, Image } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { toast } from '../hooks/use-toast';

const MainMenu = () => {
  const { musicEnabled, toggleMusic, setGameMode } = useGame();
  const navigate = useNavigate();

  const handleModeSelect = (mode: 'quickMatch' | 'career' | 'edit' | 'gallery') => {
    if (mode !== 'gallery') {
      setGameMode(mode);
    }
    
    switch(mode) {
      case 'career':
        navigate('/career');
        break;
      case 'quickMatch':
        navigate('/match');
        break;
      case 'edit':
        navigate('/edit');
        break;
      case 'gallery':
        navigate('/gallery');
        break;
    }

    toast({
      title: `${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode`,
      description: "Loading game mode...",
      duration: 2000,
    });
  };

  const menuItems = [
    { 
      title: 'Quick Match', 
      icon: <PlayCircle className="w-6 h-6" />, 
      onClick: () => handleModeSelect('quickMatch'),
      description: 'Play a single match between any teams',
      gradient: 'from-blue-500 to-blue-600',
      delay: 0.1
    },
    { 
      title: 'Career Mode', 
      icon: <Trophy className="w-6 h-6" />, 
      onClick: () => handleModeSelect('career'),
      description: 'Start from qualifiers to World Cup glory',
      gradient: 'from-yellow-500 to-yellow-600',
      delay: 0.2
    },
    { 
      title: 'Edit Teams', 
      icon: <Edit3 className="w-6 h-6" />, 
      onClick: () => handleModeSelect('edit'),
      description: 'Customize teams, players and managers',
      gradient: 'from-green-500 to-green-600',
      delay: 0.3
    },
    { 
      title: 'Trophy Gallery', 
      icon: <Image className="w-6 h-6" />, 
      onClick: () => handleModeSelect('gallery'),
      description: 'View your achievements and trophies',
      gradient: 'from-purple-500 to-purple-600',
      delay: 0.4
    },
    { 
      title: 'Load Game', 
      icon: <Save className="w-6 h-6" />, 
      onClick: () => navigate('/load'),
      description: 'Continue your saved progress',
      gradient: 'from-red-500 to-red-600',
      delay: 0.5
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary/90 p-4 md:p-8 text-white">
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-accent">
            World Cup Manager
          </h1>
          <p className="text-lg text-muted-foreground">
            Your journey to glory begins here
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: item.delay, duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={item.onClick}
                variant="secondary"
                className={`w-full h-full justify-start gap-4 p-6 bg-gradient-to-r ${item.gradient} 
                         hover:opacity-90 transition-all duration-300 shadow-lg group`}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="shrink-0"
                >
                  {item.icon}
                </motion.div>
                <div className="text-left">
                  <div className="font-semibold text-lg group-hover:text-white/90">
                    {item.title}
                  </div>
                  <div className="text-sm text-white/80 group-hover:text-white/70">
                    {item.description}
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMusic}
          className="fixed bottom-8 right-8 p-4 rounded-full bg-black/20 
                   hover:bg-black/30 transition-all duration-300 backdrop-blur-sm"
        >
          <Music className={`w-6 h-6 ${musicEnabled ? 'text-accent' : 'text-muted'}`} />
        </motion.button>
      </div>
    </div>
  );
};

export default MainMenu;