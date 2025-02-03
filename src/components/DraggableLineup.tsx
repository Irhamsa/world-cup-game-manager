import { useState } from 'react';
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
  const [lineup, setLineup] = useState<Player[]>([]);
  const [availablePlayers, setAvailablePlayers] = useState<Player[]>(players);

  const handleReorder = (newLineup: Player[]) => {
    setLineup(newLineup);
    onLineupChange(newLineup);
  };

  const addPlayerToLineup = (player: Player) => {
    if (lineup.length >= 11) {
      toast({
        title: "Lineup Penuh",
        description: "Anda sudah memilih 11 pemain",
        variant: "destructive",
      });
      return;
    }

    const newLineup = [...lineup, player];
    setLineup(newLineup);
    setAvailablePlayers(availablePlayers.filter(p => p.id !== player.id));
    onLineupChange(newLineup);
  };

  const removePlayerFromLineup = (player: Player) => {
    setLineup(lineup.filter(p => p.id !== player.id));
    setAvailablePlayers([...availablePlayers, player]);
  };

  return (
    <div className="flex gap-4">
      <div className="w-1/2">
        <h3 className="text-lg font-semibold mb-4">Starting XI</h3>
        <ScrollArea className="h-[500px]">
          <Reorder.Group axis="y" values={lineup} onReorder={handleReorder} className="space-y-2">
            {lineup.map((player, index) => (
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
                      onClick={() => removePlayerFromLineup(player)}
                    >
                      Remove
                    </Button>
                  </div>
                </Card>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </ScrollArea>
      </div>

      <div className="w-1/2">
        <h3 className="text-lg font-semibold mb-4">Available Players</h3>
        <ScrollArea className="h-[500px]">
          <div className="space-y-2">
            {availablePlayers.map((player) => (
              <Card 
                key={player.id} 
                className="p-4 cursor-pointer hover:bg-accent"
                onClick={() => addPlayerToLineup(player)}
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