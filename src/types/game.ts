export interface Player {
  id: string;
  name: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  rating: number;
  abilities: PlayerAbilities;
  imageUrl?: string;
  isSubstitute: boolean;
  adjustedRating?: number;
}

export interface PlayerAbilities {
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
}

export type PlayingStyle = 
  | 'POSSESSION'
  | 'COUNTER_ATTACK'
  | 'HIGH_PRESS'
  | 'DEFENSIVE'
  | 'BALANCED';

export interface TeamTactics {
  playingStyle: PlayingStyle;
  formation: string;
  pressureLevel: number; // 1-100
  width: number; // 1-100
  depth: number; // 1-100
}

export interface Coach {
  id: string;
  name: string;
  nationality: string;
  imageUrl?: string;
}

export interface Team {
  id: string;
  name: string;
  flag: string;
  players: Player[];
  coach: Coach;
  formation: string;
  rating: number;
}

export interface MatchEvent {
  type: 'GOAL' | 'YELLOW_CARD' | 'RED_CARD' | 'SUBSTITUTION';
  minute: number;
  team: string;
  player: string;
  additionalInfo?: string;
}

export interface MatchStats {
  possession: number;
  shots: number;
  shotsOnTarget: number;
  corners: number;
  fouls: number;
}

export interface MatchState {
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  events: MatchEvent[];
  stats: {
    home: MatchStats;
    away: MatchStats;
  };
  currentMinute: number;
  isPlaying: boolean;
}

export interface Trophy {
  id: number;
  name: string;
  date: string;
  competition: string;
  imageUrl: string;
}
