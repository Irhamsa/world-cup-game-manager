import React, { createContext, useContext, useState } from 'react';

interface SaveSlot {
  id: number;
  name: string;
  date: string;
  gameData: any; // Will be typed properly when we implement save functionality
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
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [currentSaveSlot, setCurrentSaveSlot] = useState<number | null>(null);
  const [saveSlots, setSaveSlots] = useState<SaveSlot[]>([]);
  const [gameMode, setGameMode] = useState<'quickMatch' | 'career' | 'edit' | null>(null);

  const toggleMusic = () => setMusicEnabled(!musicEnabled);

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