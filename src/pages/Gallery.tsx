import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import { motion } from 'framer-motion';

const Gallery = () => {
  const navigate = useNavigate();
  const { trophies } = useGame();

  return (
    <div className="min-h-screen bg-primary p-4 md:p-6">
      <Button
        variant="ghost"
        className="text-white mb-6"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Menu
      </Button>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Trophy Gallery</h1>
        
        {trophies.length === 0 ? (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-muted" />
            <p className="text-muted">Start your journey to earn trophies!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trophies.map((trophy) => (
              <motion.div
                key={trophy.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-secondary/10 p-6 rounded-lg backdrop-blur-sm"
              >
                <img
                  src={trophy.imageUrl}
                  alt={trophy.name}
                  className="w-32 h-32 mx-auto mb-4 object-contain"
                />
                <h3 className="text-xl font-semibold text-white">{trophy.name}</h3>
                <p className="text-muted-foreground">{trophy.competition}</p>
                <p className="text-sm text-muted-foreground">{trophy.date}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;