import React, { createContext, useContext, useState } from 'react';

interface GameContextType {
  musicEnabled: boolean;
  toggleMusic: () => void;
  currentSaveSlot: number | null;
  setCurrentSaveSlot: (slot: number | null) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [currentSaveSlot, setCurrentSaveSlot] = useState<number | null>(null);

  const toggleMusic = () => setMusicEnabled(!musicEnabled);

  return (
    <GameContext.Provider
      value={{
        musicEnabled,
        toggleMusic,
        currentSaveSlot,
        setCurrentSaveSlot,
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