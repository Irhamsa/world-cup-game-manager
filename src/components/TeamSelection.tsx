import { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { Team } from '../types/game';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollArea } from './ui/scroll-area';
import { allTeams, teamsByConfederation } from '../data/teams';

const TeamSelection = () => {
  const { setSelectedTeams } = useGame();
  const [selectedIndex, setSelectedIndex] = useState<[number, number]>([-1, -1]);
  const [selectedConfederation, setSelectedConfederation] = useState<keyof typeof teamsByConfederation | 'ALL'>('ALL');

  const handleTeamSelect = (teamIndex: number, slot: 0 | 1) => {
    const newSelected = [...selectedIndex] as [number, number];
    newSelected[slot] = teamIndex;
    setSelectedIndex(newSelected);

    if (newSelected[0] !== -1 && newSelected[1] !== -1) {
      setSelectedTeams([allTeams[newSelected[0]], allTeams[newSelected[1]]]);
      toast({
        title: "Teams Selected",
        description: "Ready to start the match!",
        duration: 2000,
      });
    }
  };

  const displayedTeams = selectedConfederation === 'ALL' 
    ? allTeams 
    : teamsByConfederation[selectedConfederation];

  return (
    <div className="p-6 space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold mb-2">Select Teams</h2>
        <p className="text-muted-foreground">Choose two teams to start the match</p>
      </motion.div>

      <div className="flex gap-2 justify-center mb-4">
        <Button
          variant={selectedConfederation === 'ALL' ? 'default' : 'secondary'}
          onClick={() => setSelectedConfederation('ALL')}
        >
          All Teams
        </Button>
        {Object.keys(teamsByConfederation).map((conf) => (
          <Button
            key={conf}
            variant={selectedConfederation === conf ? 'default' : 'secondary'}
            onClick={() => setSelectedConfederation(conf as keyof typeof teamsByConfederation)}
          >
            {conf}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[0, 1].map((slot) => (
          <div key={slot} className="space-y-4">
            <h3 className="text-xl font-semibold text-center">
              {slot === 0 ? "Home Team" : "Away Team"}
            </h3>
            <ScrollArea className="h-[600px]">
              <div className="grid gap-4 pr-4">
                {displayedTeams.map((team, index) => (
                  <motion.div
                    key={team.id}
                    initial={{ opacity: 0, x: slot === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Button
                      variant={selectedIndex[slot] === index ? "default" : "secondary"}
                      className="w-full justify-between p-4"
                      onClick={() => handleTeamSelect(index, slot as 0 | 1)}
                      disabled={selectedIndex[slot === 0 ? 1 : 0] === index}
                    >
                      <div className="flex items-center gap-4">
                        <img 
                          src={team.flag} 
                          alt={`${team.name} flag`}
                          className="w-8 h-8 object-cover rounded"
                        />
                        <div className="text-left">
                          <div className="font-semibold">{team.name}</div>
                          <div className="text-sm text-muted-foreground">
                            <span>Rating: {team.rating}</span>
                            <span className="ml-2">Formation: {team.formation}</span>
                          </div>
                        </div>
                      </div>
                      {slot === 0 ? <ArrowRight className="ml-2" /> : <ArrowLeft className="ml-2" />}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSelection;