import { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { Team } from '../types/game';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';
import { Flag, Check } from 'lucide-react';
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
  };

  const handleConfirm = () => {
    if (selectedTeamIds[0] && selectedTeamIds[1]) {
      const team1 = displayedTeams.find(t => t.id === selectedTeamIds[0]);
      const team2 = displayedTeams.find(t => t.id === selectedTeamIds[1]);
      
      if (team1 && team2) {
        setSelectedTeams([team1, team2]);
        toast({
          title: "Teams Selected",
          description: "Ready to start the match!",
          duration: 2000,
        });
      }
    } else {
      toast({
        title: "Selection Required",
        description: "Please select both teams to continue",
        duration: 2000,
      });
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

      <div className="max-w-md mx-auto space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Confederation</label>
          <Select
            value={selectedConfederation}
            onValueChange={(value) => setSelectedConfederation(value as keyof typeof teamsByConfederation | 'ALL')}
          >
            <SelectTrigger className="w-full bg-secondary">
              <SelectValue placeholder="Select confederation">
                {selectedConfederation}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL" className="bg-gray-100 hover:bg-gray-200">
                All Teams
              </SelectItem>
              {Object.keys(teamsByConfederation).map((conf) => (
                <SelectItem 
                  key={conf} 
                  value={conf}
                  className="bg-gray-100 hover:bg-gray-200"
                >
                  {conf}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {[0, 1].map((slot) => (
            <div key={slot} className="space-y-2">
              <label className="text-sm font-medium">
                {slot === 0 ? "Home Team" : "Away Team"}
              </label>
              <Select
                value={selectedTeamIds[slot]}
                onValueChange={(value) => handleTeamSelect(value, slot as 0 | 1)}
              >
                <SelectTrigger className="w-full bg-primary/5">
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
                      className="bg-gray-100 hover:bg-gray-200"
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button 
            onClick={handleConfirm}
            className="w-full bg-accent hover:bg-accent/90"
            size="lg"
          >
            <Check className="w-4 h-4 mr-2" />
            Confirm Selection
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default TeamSelection;