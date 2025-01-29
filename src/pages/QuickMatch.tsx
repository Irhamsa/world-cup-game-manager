import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { Button } from '../components/ui/button';
import { ArrowLeft, Pause, Play, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '../components/ui/use-toast';
import TeamSelection from '../components/TeamSelection';
import { MatchEvent } from '../types/game';

const QuickMatch = () => {
  const navigate = useNavigate();
  const { 
    selectedTeams,
    matchTime,
    setMatchTime,
    isPaused,
    setIsPaused,
    matchEvents,
    setMatchEvents,
    addTrophy
  } = useGame();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isPaused && matchTime < 90) {
      interval = setInterval(() => {
        setMatchTime((prev) => {
          const newTime = prev + 1;
          
          // Simulate match events
          if (Math.random() < 0.1) { // 10% chance of event per minute
            const eventTypes: ("GOAL" | "YELLOW_CARD" | "RED_CARD")[] = ["GOAL", "YELLOW_CARD", "RED_CARD"];
            const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
            const team = selectedTeams[Math.floor(Math.random() * 2)];
            
            const newEvent: MatchEvent = {
              type: eventType,
              minute: newTime,
              team: team!.id,
              player: "Player Name", // This would come from the team's players array in a full implementation
              additionalInfo: eventType === "GOAL" ? "Amazing shot!" : 
                            eventType === "YELLOW_CARD" ? "Rough tackle" : 
                            "Serious foul"
            };
            
            setMatchEvents(prev => [...prev, newEvent]);
            
            if (eventType === "GOAL") {
              toast({
                title: "GOAL!",
                description: `${team!.name} scores at ${newTime}'!`,
                duration: 3000,
              });
            }
          }

          if (newTime >= 90) {
            setIsPaused(true);
            const homeScore = matchEvents.filter(e => e.type === "GOAL" && e.team === selectedTeams[0]?.id).length;
            const awayScore = matchEvents.filter(e => e.type === "GOAL" && e.team === selectedTeams[1]?.id).length;
            
            const winner = homeScore > awayScore ? selectedTeams[0]?.name : 
                         awayScore > homeScore ? selectedTeams[1]?.name : 
                         "Draw";
                         
            if (winner !== "Draw") {
              addTrophy({
                id: Date.now(),
                name: "Quick Match Victory",
                date: new Date().toLocaleDateString(),
                competition: "Quick Match",
                imageUrl: "/placeholder.svg"
              });
            }

            toast({
              title: "Match Finished!",
              description: winner === "Draw" ? "The match ends in a draw!" : `${winner} wins the match!`,
              duration: 5000,
            });
            return 90;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPaused, matchTime, setMatchTime, setIsPaused, selectedTeams, setMatchEvents, matchEvents, addTrophy]);

  if (!selectedTeams[0] || !selectedTeams[1]) {
    return <TeamSelection />;
  }

  const homeScore = matchEvents.filter(e => e.type === "GOAL" && e.team === selectedTeams[0].id).length;
  const awayScore = matchEvents.filter(e => e.type === "GOAL" && e.team === selectedTeams[1].id).length;

  return (
    <div className="min-h-screen bg-primary p-4 text-white">
      <div className="max-w-4xl mx-auto">
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
            {matchTime >= 90 ? "Full Time" : 
             Math.floor(matchTime / 45) === 0 ? "First Half" : "Second Half"}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPaused(!isPaused)}
            className="text-white"
            disabled={matchTime >= 90}
          >
            {isPaused ? (
              <Play className="h-6 w-6" />
            ) : (
              <Pause className="h-6 w-6" />
            )}
          </Button>
        </div>

        <motion.div 
          className="bg-secondary/10 rounded-lg p-6 mb-6 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid grid-cols-3 gap-4 items-center mb-4">
            <div className="text-center">
              <img 
                src={selectedTeams[0].flag} 
                alt={selectedTeams[0].name}
                className="w-20 h-20 mx-auto mb-2 rounded-lg shadow-lg"
              />
              <div className="font-bold text-lg">{selectedTeams[0].name}</div>
              <div className="text-sm text-muted-foreground">Rating: {selectedTeams[0].rating}</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">
                {homeScore} - {awayScore}
              </div>
              <div className="text-2xl font-bold text-accent">
                {matchTime}'
              </div>
            </div>
            <div className="text-center">
              <img 
                src={selectedTeams[1].flag} 
                alt={selectedTeams[1].name}
                className="w-20 h-20 mx-auto mb-2 rounded-lg shadow-lg"
              />
              <div className="font-bold text-lg">{selectedTeams[1].name}</div>
              <div className="text-sm text-muted-foreground">Rating: {selectedTeams[1].rating}</div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {matchEvents.map((event, index) => (
            <motion.div
              key={index}
              className="bg-secondary/10 rounded-lg p-3 text-sm backdrop-blur-sm"
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