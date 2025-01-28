import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { Button } from '../components/ui/button';
import { ArrowLeft, Pause, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const QuickMatch = () => {
  const navigate = useNavigate();
  const { 
    selectedTeams,
    matchTime,
    setMatchTime,
    isPaused,
    setIsPaused,
    matchEvents
  } = useGame();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isPaused && matchTime < 90) {
      interval = setInterval(() => {
        setMatchTime(prev => {
          const newTime = prev + 1;
          if (newTime >= 90) {
            setIsPaused(true);
            return 90;
          }
          return newTime;
        });
      }, 1000); // 1 second = 1 minute in game time
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPaused, matchTime, setMatchTime, setIsPaused]);

  if (!selectedTeams[0] || !selectedTeams[1]) {
    return (
      <div className="min-h-screen bg-primary p-4 text-white">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="mb-4">Teams not selected</p>
          <Button onClick={() => navigate('/')} variant="secondary">
            Return to Menu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="text-white"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="text-2xl font-bold">
            {Math.floor(matchTime / 45) === 0 ? "First Half" : "Second Half"}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPaused(!isPaused)}
            className="text-white"
          >
            {isPaused ? (
              <Play className="h-6 w-6" />
            ) : (
              <Pause className="h-6 w-6" />
            )}
          </Button>
        </div>

        <motion.div 
          className="bg-secondary/10 rounded-lg p-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="text-center flex-1">
              <img 
                src={selectedTeams[0].flag} 
                alt={selectedTeams[0].name}
                className="w-16 h-16 mx-auto mb-2 rounded"
              />
              <div className="font-bold">{selectedTeams[0].name}</div>
            </div>
            <div className="text-4xl font-bold px-4">
              {matchEvents.filter(e => e.type === 'GOAL' && e.team === selectedTeams[0].id).length}
              {' - '}
              {matchEvents.filter(e => e.type === 'GOAL' && e.team === selectedTeams[1].id).length}
            </div>
            <div className="text-center flex-1">
              <img 
                src={selectedTeams[1].flag} 
                alt={selectedTeams[1].name}
                className="w-16 h-16 mx-auto mb-2 rounded"
              />
              <div className="font-bold">{selectedTeams[1].name}</div>
            </div>
          </div>
          <div className="text-center text-xl font-bold">
            {matchTime}'
          </div>
        </motion.div>

        <div className="space-y-2">
          {matchEvents.map((event, index) => (
            <motion.div
              key={index}
              className="bg-secondary/10 rounded p-2 text-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="font-bold">{event.minute}'</span> - {event.type}:{' '}
              {event.player} ({event.team === selectedTeams[0].id ? selectedTeams[0].name : selectedTeams[1].name})
              {event.additionalInfo && ` - ${event.additionalInfo}`}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickMatch;