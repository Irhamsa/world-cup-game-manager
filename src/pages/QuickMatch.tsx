import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { Team, MatchEvent } from '../types/game'; // Added MatchEvent import
import { Button } from '../components/ui/button';
import { ArrowLeft, Pause, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '../components/ui/use-toast';
import TeamSelection from '../components/TeamSelection';
import TeamTacticsSelection from '../components/TeamTacticsSelection';
import PostMatchActions from '../components/PostMatchActions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import SideSelection from '../components/SideSelection';

const QuickMatch = () => {
  const { 
    selectedTeams,
    setSelectedTeams,
    matchTime,
    setMatchTime,
    isPaused,
    setIsPaused,
    matchEvents,
    setMatchEvents,
    addTrophy,
    playerSide,
    setPlayerSide,
    teamTactics,
    setTeamTactics
  } = useGame();

  const [showExitDialog, setShowExitDialog] = useState(false);
  const [tacticsConfirmed, setTacticsConfirmed] = useState(false);
  const [teamFormations, setTeamFormations] = useState(['', '']);
  const [teamLineups, setTeamLineups] = useState([[], []]);

  const handleTacticsConfirm = (teamIndex: number, formation: string, lineup: string[]) => {
    const newFormations = [...teamFormations];
    const newLineups = [...teamLineups];
    newFormations[teamIndex] = formation;
    newLineups[teamIndex] = lineup;
    setTeamFormations(newFormations);
    setTeamLineups(newLineups);

    if (newFormations[0] && newFormations[1]) {
      setTacticsConfirmed(true);
      toast({
        title: "Tactics Confirmed",
        description: "The match is ready to begin!",
        duration: 2000,
      });
    }
  };

  const handleNewMatch = () => {
    setSelectedTeams([null, null]);
    setMatchTime(0);
    setMatchEvents([]);
    setIsPaused(true);
    setTacticsConfirmed(false);
    setTeamFormations(['', '']);
    setTeamLineups([[], []]);
  };

  const handleRematch = () => {
    setMatchTime(0);
    setMatchEvents([]);
    setIsPaused(true);
    setTacticsConfirmed(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isPaused && matchTime < 90) {
      interval = setInterval(() => {
        setMatchTime(prevTime => {
          const newTime = prevTime + 1;
          
          // Simulate match events
          if (Math.random() < 0.1) {
            const eventTypes: ("GOAL" | "YELLOW_CARD" | "RED_CARD")[] = ["GOAL", "YELLOW_CARD", "RED_CARD"];
            const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
            const teamIndex = Math.floor(Math.random() * 2);
            const team = selectedTeams[teamIndex];
            
            if (team) {
              const newEvent: MatchEvent = {
                type: eventType,
                minute: newTime,
                team: team.id,
                player: `Player ${Math.floor(Math.random() * 11) + 1}`,
                additionalInfo: eventType === "GOAL" ? "Amazing shot!" : 
                              eventType === "YELLOW_CARD" ? "Rough tackle" : 
                              "Serious foul"
              };

              const updatedEvents = [...matchEvents, newEvent];
              setMatchEvents(updatedEvents);
              
              if (eventType === "GOAL") {
                toast({
                  title: "GOAL!",
                  description: `${team.name} scores at ${newTime}'!`,
                  duration: 3000,
                });
              }
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

  if (!playerSide) {
    return <SideSelection />;
  }

  if (!tacticsConfirmed) {
    const playerTeam = playerSide === 'HOME' ? selectedTeams[0] : selectedTeams[1];
    return (
      <div className="p-4">
        <TeamTacticsSelection
          team={playerTeam}
          onConfirm={(formation, lineup, tactics) => {
            handleTacticsConfirm(playerSide === 'HOME' ? 0 : 1, formation, lineup);
            setTeamTactics({
              ...tactics,
              formation
            });
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary/90 p-4 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowExitDialog(true)}
            className="text-white hover:bg-white/10"
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
            className="text-white hover:bg-white/10"
            disabled={matchTime >= 90}
          >
            {isPaused ? (
              <Play className="h-6 w-6" />
            ) : (
              <Pause className="h-6 w-6" />
            )}
          </Button>
        </div>

        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          <AnimatePresence>
            {matchEvents.map((event, index) => (
              <motion.div
                key={`${event.minute}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`
                  bg-black/20 rounded-lg p-3 text-sm backdrop-blur-sm
                  ${event.type === 'GOAL' ? 'border-l-4 border-green-500' : 
                    event.type === 'RED_CARD' ? 'border-l-4 border-red-500' : 
                    event.type === 'YELLOW_CARD' ? 'border-l-4 border-yellow-500' : ''}
                `}
              >
                <span className="font-bold">{event.minute}'</span> - {event.type}:{' '}
                {event.player} ({event.team === selectedTeams[0].id ? selectedTeams[0].name : selectedTeams[1].name})
                {event.additionalInfo && (
                  <span className="text-white/70"> - {event.additionalInfo}</span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {matchTime >= 90 && (
          <PostMatchActions
            onRematch={handleRematch}
            onBackToMenu={() => navigate('/')}
            onNewMatch={handleNewMatch}
          />
        )}
      </div>

      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Stop Match?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to stop this match? All progress will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, continue match</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              handleNewMatch();
              setShowExitDialog(false);
            }}>
              Yes, stop match
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default QuickMatch;
