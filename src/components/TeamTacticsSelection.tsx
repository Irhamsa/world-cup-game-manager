import { useState } from 'react';
import { Team, PlayingStyle } from '../types/game';
import { Button } from './ui/button';
import { Play } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import { toast } from './ui/use-toast';
import DraggableLineup from './DraggableLineup';
import BackButton from './BackButton';

interface TeamTacticsSelectionProps {
  team: Team;
  onConfirm: (formation: string, startingLineup: string[], tactics: {
    playingStyle: PlayingStyle;
    pressureLevel: number;
    width: number;
    depth: number;
  }) => void;
}

const TeamTacticsSelection = ({ team, onConfirm }: TeamTacticsSelectionProps) => {
  const [selectedFormation, setSelectedFormation] = useState(team.formation);
  const [startingLineup, setStartingLineup] = useState(
    team.players.filter(p => !p.isSubstitute).map(p => p.id)
  );
  const [playingStyle, setPlayingStyle] = useState<PlayingStyle>('BALANCED');
  const [pressureLevel, setPressureLevel] = useState(50);
  const [width, setWidth] = useState(50);
  const [depth, setDepth] = useState(50);

  const formations = ['4-4-2', '4-3-3', '4-2-3-1', '3-5-2', '5-3-2'];
  const playingStyles: PlayingStyle[] = ['POSSESSION', 'COUNTER_ATTACK', 'HIGH_PRESS', 'DEFENSIVE', 'BALANCED'];

  const handleStartMatch = () => {
    if (startingLineup.length !== 11) {
      toast({
        title: "Invalid Lineup",
        description: "Please select exactly 11 players for the starting lineup",
        variant: "destructive",
      });
      return;
    }
    onConfirm(selectedFormation, startingLineup, {
      playingStyle,
      pressureLevel,
      width,
      depth
    });
  };

  return (
    <div className="p-4 relative">
      <BackButton />
      
      <h3 className="text-lg font-semibold text-center mb-4">{team.name} Tactics</h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Playing Style</label>
            <Select
              value={playingStyle}
              onValueChange={(value) => setPlayingStyle(value as PlayingStyle)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select playing style" />
              </SelectTrigger>
              <SelectContent>
                {playingStyles.map(style => (
                  <SelectItem key={style} value={style}>
                    {style.replace('_', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Formation</label>
            <Select
              value={selectedFormation}
              onValueChange={setSelectedFormation}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select formation" />
              </SelectTrigger>
              <SelectContent>
                {formations.map(formation => (
                  <SelectItem key={formation} value={formation}>
                    {formation}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Team Pressure</label>
              <Slider
                value={[pressureLevel]}
                onValueChange={([value]) => setPressureLevel(value)}
                max={100}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Team Width</label>
              <Slider
                value={[width]}
                onValueChange={([value]) => setWidth(value)}
                max={100}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Team Depth</label>
              <Slider
                value={[depth]}
                onValueChange={([value]) => setDepth(value)}
                max={100}
                step={1}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <DraggableLineup
            players={team.players.filter(p => !p.isSubstitute)}
            formation={selectedFormation}
            onLineupChange={(players) => {
              setStartingLineup(players.map(p => p.id));
            }}
          />
        </div>
      </div>

      <Button 
        onClick={handleStartMatch}
        disabled={startingLineup.length !== 11}
        className="w-full mt-8"
      >
        <Play className="w-4 h-4 mr-2" />
        Start Match
      </Button>
    </div>
  );
};

export default TeamTacticsSelection;