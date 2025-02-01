import { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { Team } from '../types/game';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';
import { Check, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollArea } from './ui/scroll-area';
import { allTeams, teamsByConfederation } from '../data/teams';

const TeamSelection = () => {
  const { setSelectedTeams } = useGame();
  const [selectedTeamIds, setSelectedTeamIds] = useState<[string, string]>(['', '']);
  const [selectedConfederation, setSelectedConfederation] = useState<keyof typeof teamsByConfederation | 'ALL'>('ALL');
  const [isConfedDropdownOpen, setIsConfedDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<null | 0 | 1>(null);

  const displayedTeams = selectedConfederation === 'ALL' 
    ? allTeams 
    : teamsByConfederation[selectedConfederation];

  const handleTeamSelect = (teamId: string, slot: 0 | 1) => {
    const newSelected = [...selectedTeamIds] as [string, string];
    newSelected[slot] = teamId;
    setSelectedTeamIds(newSelected);
    setActiveDropdown(null);
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

  const CustomDropdown = ({ 
    label, 
    isOpen, 
    onToggle, 
    children 
  }: { 
    label: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
  }) => (
    <div className="relative">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 bg-secondary rounded-md border border-border"
      >
        <span>{label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow-lg">
          <ScrollArea className="h-48">
            {children}
          </ScrollArea>
        </div>
      )}
    </div>
  );

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
          <CustomDropdown
            label={selectedConfederation}
            isOpen={isConfedDropdownOpen}
            onToggle={() => setIsConfedDropdownOpen(!isConfedDropdownOpen)}
          >
            <div className="p-1">
              <button
                onClick={() => {
                  setSelectedConfederation('ALL');
                  setIsConfedDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-accent rounded-sm"
              >
                All Teams
              </button>
              {Object.keys(teamsByConfederation).map((conf) => (
                <button
                  key={conf}
                  onClick={() => {
                    setSelectedConfederation(conf as keyof typeof teamsByConfederation);
                    setIsConfedDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-accent rounded-sm"
                >
                  {conf}
                </button>
              ))}
            </div>
          </CustomDropdown>
        </div>

        <div className="space-y-4">
          {([0, 1] as const).map((slot) => (
            <div key={slot} className="space-y-2">
              <label className="text-sm font-medium">
                {slot === 0 ? "Home Team" : "Away Team"}
              </label>
              <CustomDropdown
                label={selectedTeamIds[slot] 
                  ? displayedTeams.find(t => t.id === selectedTeamIds[slot])?.name || 'Select a team'
                  : 'Select a team'
                }
                isOpen={activeDropdown === slot}
                onToggle={() => setActiveDropdown(activeDropdown === slot ? null : slot)}
              >
                <div className="p-1">
                  {displayedTeams.map((team) => (
                    <button
                      key={team.id}
                      onClick={() => handleTeamSelect(team.id, slot)}
                      disabled={selectedTeamIds[slot === 0 ? 1 : 0] === team.id}
                      className={`w-full flex items-center gap-2 px-3 py-2 hover:bg-accent rounded-sm ${
                        selectedTeamIds[slot === 0 ? 1 : 0] === team.id ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <img
                        src={team.flag}
                        alt={`${team.name} flag`}
                        className="w-6 h-6 object-cover rounded"
                      />
                      <span>{team.name}</span>
                      <span className="text-muted-foreground ml-2">
                        ({team.rating})
                      </span>
                    </button>
                  ))}
                </div>
              </CustomDropdown>
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