import { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Player } from '../types/game';
import { toast } from './ui/use-toast';

interface DraggableLineupProps {
  players: Player[];
  formation: string;
  onLineupChange: (players: Player[]) => void;
}

const DraggableLineup = ({ players, formation, onLineupChange }: DraggableLineupProps) => {
  const [lineup, setLineup] = useState<Player[]>(players);
  const [positions, setPositions] = useState<{[key: string]: {x: number, y: number}>({});

  useEffect(() => {
    // Generate positions based on formation
    const formationArray = formation.split('-').map(Number);
    const positions: {[key: string]: {x: number, y: number}} = {};
    
    // GK position
    positions['GK'] = { x: 50, y: 90 };
    
    let currentY = 70;
    let playerIndex = 0;
    
    formationArray.forEach((playersInLine, lineIndex) => {
      const spacing = 100 / (playersInLine + 1);
      for(let i = 0; i < playersInLine; i++) {
        const position = lineIndex === 0 ? 'DEF' : 
                        lineIndex === formationArray.length - 1 ? 'FWD' : 'MID';
        positions[`${position}${playerIndex}`] = {
          x: spacing * (i + 1),
          y: currentY
        };
        playerIndex++;
      }
      currentY -= 20;
    });
    
    setPositions(positions);
  }, [formation]);

  const calculateAdjustedRating = (player: Player, positionType: string) => {
    if (player.position !== positionType) {
      return player.rating - 2;
    }
    return player.rating;
  };

  const handleDragEnd = (player: Player, newPosition: string) => {
    const adjustedRating = calculateAdjustedRating(player, newPosition);
    if (adjustedRating < player.rating) {
      toast({
        title: "Position Warning",
        description: `${player.name} is playing out of position (-2 OVR)`,
        duration: 3000,
      });
    }
    
    const newLineup = lineup.map(p => 
      p.id === player.id 
        ? { ...p, adjustedRating: adjustedRating }
        : p
    );
    
    setLineup(newLineup);
    onLineupChange(newLineup);
  };

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-b from-green-600 to-green-700 rounded-lg">
      <div className="absolute inset-0">
        {/* Field markings */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-white/50" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-white/50" />
        <div className="absolute inset-x-0 bottom-0 h-[100px] border-t-2 border-white/50" />
        <div className="absolute inset-x-0 top-0 h-[100px] border-b-2 border-white/50" />
      </div>

      <Reorder.Group axis="y" values={lineup} onReorder={setLineup}>
        {lineup.map((player) => (
          <Reorder.Item key={player.id} value={player}>
            <motion.div
              drag
              dragConstraints={{
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
              className="absolute cursor-move"
              style={{
                left: `${positions[player.position]?.x ?? 0}%`,
                top: `${positions[player.position]?.y ?? 0}%`,
              }}
              onDragEnd={(e, info) => {
                // Calculate new position based on drag end coordinates
                const element = e.target as HTMLElement;
                const rect = element.getBoundingClientRect();
                const x = (rect.left / window.innerWidth) * 100;
                const y = (rect.top / window.innerHeight) * 100;
                
                // Find closest position
                let closestPosition = player.position;
                let minDistance = Infinity;
                
                Object.entries(positions).forEach(([pos, coords]) => {
                  const distance = Math.sqrt(
                    Math.pow(x - coords.x, 2) + Math.pow(y - coords.y, 2)
                  );
                  if (distance < minDistance) {
                    minDistance = distance;
                    closestPosition = pos;
                  }
                });
                
                handleDragEnd(player, closestPosition);
              }}
            >
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center
                              ${player.position !== positions[player.position] ? 'border-2 border-yellow-400' : ''}`}>
                  <span className="text-sm font-bold">{player.rating}</span>
                </div>
                <span className="text-xs text-white mt-1">{player.name}</span>
              </div>
            </motion.div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

export default DraggableLineup;