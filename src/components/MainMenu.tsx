import { Music, Trophy, Users, PlayCircle, Save } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import { motion } from 'framer-motion';

const MainMenu = () => {
  const { musicEnabled, toggleMusic } = useGame();

  const menuItems = [
    { title: 'Quick Match', icon: <PlayCircle className="w-6 h-6" />, path: '/match' },
    { title: 'Career Mode', icon: <Trophy className="w-6 h-6" />, path: '/career' },
    { title: 'Edit Teams', icon: <Users className="w-6 h-6" />, path: '/edit' },
    { title: 'Load Game', icon: <Save className="w-6 h-6" />, path: '/load' },
  ];

  return (
    <div className="min-h-screen bg-primary p-6 text-white">
      <div className="max-w-md mx-auto space-y-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-12"
        >
          World Cup Manager
        </motion.h1>

        <div className="grid gap-4">
          {menuItems.map((item, index) => (
            <motion.a
              key={item.title}
              href={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center p-4 bg-secondary/10 rounded-lg backdrop-blur-sm 
                         hover:bg-secondary/20 transition-all duration-300"
            >
              {item.icon}
              <span className="ml-4">{item.title}</span>
            </motion.a>
          ))}
        </div>

        <button
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-secondary/10 
                     hover:bg-secondary/20 transition-all duration-300"
        >
          <Music className={`w-6 h-6 ${musicEnabled ? 'text-accent' : 'text-muted'}`} />
        </button>
      </div>
    </div>
  );
};

export default MainMenu;