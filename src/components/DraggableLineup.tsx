import { useState, useEffect } from 'react';
import { Reorder } from 'framer-motion';
import { Player } from '../types/game';
import { toast } from './ui/use-toast';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface DraggableLineupProps {
  players: Player[];
  formation: string;
  onLineupChange: (players: Player[]) => void;
}

const DraggableLineup = ({ players, onLineupChange }: DraggableLineupProps) => {
  // Split players into starters and substitutes based on isSubstitute flag
  const defaultStarters = players.filter(p => !p.isSubstitute).slice(0, 11);
  const defaultSubs = players.filter(p => p.isSubstitute);

  const [startingXI, setStartingXI] = useState<Player[]>(defaultStarters);
  const [substitutes, setSubstitutes] = useState<Player[]>(defaultSubs);

  useEffect(() => {
    onLineupChange(startingXI);
  }, [startingXI, onLineupChange]);

  const handleSwapPlayers = (fromStarting: boolean, player: Player) => {
    if (fromStarting) {
      // Moving from starting XI to substitutes
      if (startingXI.length <= 11) {
        toast({
          title: "Cannot Remove Player",
          description: "You must maintain at least 11 players in the starting lineup",
          variant: "destructive",
        });
        return;
      }
      setStartingXI(prev => prev.filter(p => p.id !== player.id));
      setSubstitutes(prev => [...prev, { ...player, isSubstitute: true }]);
    } else {
      // Moving from substitutes to starting XI
      if (startingXI.length >= 11) {
        toast({
          title: "Starting XI Full",
          description: "You can only have 11 players in the starting lineup",
          variant: "destructive",
        });
        return;
      }
      setSubstitutes(prev => prev.filter(p => p.id !== player.id));
      setStartingXI(prev => [...prev, { ...player, isSubstitute: false }]);
    }
  };

  return (
    <div className="flex gap-4">
      <div className="w-1/2">
        <h3 className="text-lg font-semibold mb-4">Starting XI ({startingXI.length}/11)</h3>
        <ScrollArea className="h-[500px]">
          <Reorder.Group axis="y" values={startingXI} onReorder={setStartingXI} className="space-y-2">
            {startingXI.map((player, index) => (
              <Reorder.Item key={player.id} value={player}>
                <Card className="p-4 cursor-move bg-accent hover:bg-accent/90">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold mr-2">{index + 1}.</span>
                      <span className="font-medium">{player.name}</span>
                      <span className="text-xs ml-2 text-muted-foreground">({player.position})</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleSwapPlayers(true, player)}
                    >
                      To Subs
                    </Button>
                  </div>
                </Card>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </ScrollArea>
      </div>

      <div className="w-1/2">
        <h3 className="text-lg font-semibold mb-4">Substitutes ({substitutes.length})</h3>
        <ScrollArea className="h-[500px]">
          <div className="space-y-2">
            {substitutes.map((player) => (
              <Card 
                key={player.id} 
                className="p-4 cursor-pointer hover:bg-accent"
                onClick={() => handleSwapPlayers(false, player)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold mr-2">{player.rating}</span>
                    <span className="font-medium">{player.name}</span>
                    <span className="text-xs ml-2 text-muted-foreground">({player.position})</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default DraggableLineup;