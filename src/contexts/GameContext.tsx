import React, { createContext, useContext, useState } from 'react';
import { Team, MatchEvent, Trophy } from '../types/game';

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
  selectedTeams: [Team | null, Team | null];
  setSelectedTeams: (teams: [Team | null, Team | null]) => void;
  matchEvents: MatchEvent[];
  setMatchEvents: (events: MatchEvent[]) => void;
  matchTime: number;
  setMatchTime: (time: number) => void;
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [currentSaveSlot, setCurrentSaveSlot] = useState<number | null>(null);
  const [saveSlots, setSaveSlots] = useState<SaveSlot[]>([]);
  const [gameMode, setGameMode] = useState<'quickMatch' | 'career' | 'edit' | null>(null);
  const [trophies, setTrophies] = useState<Trophy[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<[Team | null, Team | null]>([null, null]);
  const [matchEvents, setMatchEvents] = useState<MatchEvent[]>([]);
  const [matchTime, setMatchTime] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

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
        selectedTeams,
        setSelectedTeams,
        matchEvents,
        setMatchEvents,
        matchTime,
        setMatchTime,
        isPaused,
        setIsPaused,
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