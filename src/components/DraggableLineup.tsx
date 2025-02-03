import { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Player } from '../types/game';
import { toast } from './ui/use-toast';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';

interface DraggableLineupProps {
  players: Player[];
  formation: string;
  onLineupChange: (players: Player[]) => void;
}

interface Position {
  x: number;
  y: number;
}

type Positions = Record<string, Position>;
type ValidPosition = 'GK' | 'DEF' | 'MID' | 'FWD';

const DraggableLineup = ({ players, formation, onLineupChange }: DraggableLineupProps) => {
  const [lineup, setLineup] = useState<Player[]>(players);
  const [positions, setPositions] = useState<Positions>({});
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [availablePlayers, setAvailablePlayers] = useState<Player[]>(players);

  useEffect(() => {
    // Generate positions based on formation
    const formationArray = formation.split('-').map(Number);
    const newPositions: Positions = {};
    
    // GK position
    newPositions['GK'] = { x: 50, y: 90 };
    
    let currentY = 70;
    let playerIndex = 0;
    
    formationArray.forEach((playersInLine, lineIndex) => {
      const spacing = 100 / (playersInLine + 1);
      for(let i = 0; i < playersInLine; i++) {
        const position = lineIndex === 0 ? 'DEF' : 
                        lineIndex === formationArray.length - 1 ? 'FWD' : 'MID';
        newPositions[`${position}${playerIndex}`] = {
          x: spacing * (i + 1),
          y: currentY
        };
        playerIndex++;
      }
      currentY -= 20;
    });
    
    setPositions(newPositions);
  }, [formation]);

  const calculateAdjustedRating = (player: Player, positionType: ValidPosition) => {
    if (player.position !== positionType) {
      return player.rating - 2;
    }
    return player.rating;
  };

  const handlePlayerSelect = (player: Player, positionKey: string) => {
    const match = positionKey.match(/(GK|DEF|MID|FWD)/);
    if (!match) return;

    const positionType = match[0] as ValidPosition;
    const adjustedRating = calculateAdjustedRating(player, positionType);

    if (adjustedRating < player.rating) {
      toast({
        title: "Peringatan Posisi",
        description: `${player.name} bermain di luar posisi (-2 OVR)`,
        duration: 3000,
      });
    }

    const updatedPlayer: Player = {
      ...player,
      position: positionType,
      adjustedRating
    };

    const newLineup = lineup.map(p => 
      p.id === player.id ? updatedPlayer : p
    );

    setLineup(newLineup);
    onLineupChange(newLineup);
    setSelectedPosition(null);
    setAvailablePlayers(availablePlayers.filter(p => p.id !== player.id));
  };

  return (
    <div className="flex gap-4">
      <div className="relative w-2/3 h-[600px] bg-gradient-to-b from-green-600 to-green-700 rounded-lg">
        <div className="absolute inset-0">
          {/* Field markings */}
          <div className="absolute inset-x-0 top-1/2 h-px bg-white/50" />
          <div className="absolute inset-y-0 left-1/2 w-px bg-white/50" />
          <div className="absolute inset-x-0 bottom-0 h-[100px] border-t-2 border-white/50" />
          <div className="absolute inset-x-0 top-0 h-[100px] border-b-2 border-white/50" />
        </div>

        {Object.entries(positions).map(([posKey, pos]) => (
          <div
            key={posKey}
            className={`absolute cursor-pointer ${
              selectedPosition === posKey ? 'ring-2 ring-yellow-400' : ''
            }`}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
            }}
            onClick={() => setSelectedPosition(posKey)}
          >
            {lineup.find(p => p.position === posKey.match(/(GK|DEF|MID|FWD)/)?.[0] as ValidPosition) ? (
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center
                              ${lineup.find(p => p.position === posKey.match(/(GK|DEF|MID|FWD)/)?.[0] as ValidPosition)?.adjustedRating !== 
                                lineup.find(p => p.position === posKey.match(/(GK|DEF|MID|FWD)/)?.[0] as ValidPosition)?.rating ? 'border-2 border-yellow-400' : ''}`}>
                  <span className="text-sm font-bold">
                    {lineup.find(p => p.position === posKey.match(/(GK|DEF|MID|FWD)/)?.[0] as ValidPosition)?.adjustedRating || 
                     lineup.find(p => p.position === posKey.match(/(GK|DEF|MID|FWD)/)?.[0] as ValidPosition)?.rating}
                  </span>
                </div>
                <span className="text-xs text-white mt-1">
                  {lineup.find(p => p.position === posKey.match(/(GK|DEF|MID|FWD)/)?.[0] as ValidPosition)?.name}
                </span>
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-sm font-bold text-white">{posKey}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="w-1/3 bg-background rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Pemain Tersedia</h3>
        <ScrollArea className="h-[500px]">
          <div className="space-y-2">
            {availablePlayers.map((player) => (
              <Button
                key={player.id}
                onClick={() => selectedPosition && handlePlayerSelect(player, selectedPosition)}
                disabled={!selectedPosition}
                className="w-full justify-start"
                variant={selectedPosition ? "default" : "secondary"}
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold">{player.rating}</span>
                  <span>{player.name}</span>
                  <span className="text-xs opacity-70">({player.position})</span>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default DraggableLineup;