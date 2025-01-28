import React, { createContext, useContext, useState } from 'react';

interface SaveSlot {
  id: number;
  name: string;
  date: string;
  gameData: any;
}

interface Trophy {
  id: number;
  name: string;
  date: string;
  competition: string;
  imageUrl: string;
}

interface GameContextType {
  musicEnabled: boolean;
  toggleMusic: () => void;
  currentSaveSlot: number | null;
  setCurrentSaveSlot: (slot: number | null) => void;
  saveSlots: SaveSlot[];
  setSaveSlots: (slots: SaveSlot[]) => void;
  gameMode: 'quickMatch' | 'career' | 'edit' | null;
  setGameMode: (mode: 'quickMatch' | 'career' | 'edit' | null) => void;
  trophies: Trophy[];
  addTrophy: (trophy: Trophy) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [currentSaveSlot, setCurrentSaveSlot] = useState<number | null>(null);
  const [saveSlots, setSaveSlots] = useState<SaveSlot[]>([]);
  const [gameMode, setGameMode] = useState<'quickMatch' | 'career' | 'edit' | null>(null);
  const [trophies, setTrophies] = useState<Trophy[]>([]);

  const toggleMusic = () => setMusicEnabled(!musicEnabled);
  
  const addTrophy = (trophy: Trophy) => {
    setTrophies(prev => [...prev, trophy]);
  };

  return (
    <GameContext.Provider
      value={{
        musicEnabled,
        toggleMusic,
        currentSaveSlot,
        setCurrentSaveSlot,
        saveSlots,
        setSaveSlots,
        gameMode,
        setGameMode,
        trophies,
        addTrophy,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}