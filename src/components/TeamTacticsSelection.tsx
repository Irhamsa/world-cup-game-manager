import { useState } from 'react';
import { Team, PlayingStyle } from '../types/game';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
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
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">{team.name} Tactics</h3>
      
      <div className="space-y-4">
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

        <div className="space-y-2">
          <label className="text-sm font-medium">Starting Lineup</label>
          <ScrollArea className="h-64 border rounded-md p-2">
            {team.players.map(player => (
              <div key={player.id} className="flex items-center space-x-2 p-2">
                <input
                  type="checkbox"
                  checked={startingLineup.includes(player.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      if (startingLineup.length < 11) {
                        setStartingLineup([...startingLineup, player.id]);
                      } else {
                        toast({
                          title: "Maximum Players Reached",
                          description: "You can only select 11 players for the starting lineup",
                          variant: "destructive",
                        });
                      }
                    } else {
                      setStartingLineup(startingLineup.filter(id => id !== player.id));
                    }
                  }}
                  className="rounded border-gray-300"
                />
                <span>{player.name}</span>
                <span className="text-sm text-muted-foreground">
                  ({player.position}) - OVR: {player.rating}
                </span>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>

      <Button 
        onClick={handleStartMatch}
        disabled={startingLineup.length !== 11}
        className="w-full"
      >
        <Play className="w-4 h-4 mr-2" />
        Start Match
      </Button>
    </div>
  );
};

export default TeamTacticsSelection;