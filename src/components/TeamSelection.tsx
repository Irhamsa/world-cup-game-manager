import { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { Team } from '../types/game';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';
import { Flag } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { allTeams, teamsByConfederation } from '../data/teams';

const TeamSelection = () => {
  const { setSelectedTeams } = useGame();
  const [selectedTeamIds, setSelectedTeamIds] = useState<[string, string]>(['', '']);
  const [selectedConfederation, setSelectedConfederation] = useState<keyof typeof teamsByConfederation | 'ALL'>('ALL');

  const displayedTeams = selectedConfederation === 'ALL' 
    ? allTeams 
    : teamsByConfederation[selectedConfederation];

  const handleTeamSelect = (teamId: string, slot: 0 | 1) => {
    const newSelected = [...selectedTeamIds] as [string, string];
    newSelected[slot] = teamId;
    setSelectedTeamIds(newSelected);

    if (newSelected[0] && newSelected[1]) {
      const team1 = displayedTeams.find(t => t.id === newSelected[0]);
      const team2 = displayedTeams.find(t => t.id === newSelected[1]);
      
      if (team1 && team2) {
        setSelectedTeams([team1, team2]);
        toast({
          title: "Teams Selected",
          description: "Ready to start the match!",
          duration: 2000,
        });
      }
    }
  };

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
            <Select
              value={selectedTeamIds[slot]}
              onValueChange={(value) => handleTeamSelect(value, slot as 0 | 1)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a team">
                  {selectedTeamIds[slot] && (
                    <div className="flex items-center gap-2">
                      <img
                        src={displayedTeams.find(t => t.id === selectedTeamIds[slot])?.flag}
                        alt="flag"
                        className="w-6 h-6 object-cover rounded"
                      />
                      <span>
                        {displayedTeams.find(t => t.id === selectedTeamIds[slot])?.name}
                      </span>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {displayedTeams.map((team) => (
                  <SelectItem
                    key={team.id}
                    value={team.id}
                    disabled={selectedTeamIds[slot === 0 ? 1 : 0] === team.id}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={team.flag}
                        alt={`${team.name} flag`}
                        className="w-6 h-6 object-cover rounded"
                      />
                      <span>{team.name}</span>
                      <span className="text-muted-foreground ml-2">
                        ({team.rating})
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSelection;