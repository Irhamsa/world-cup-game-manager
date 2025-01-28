export interface Player {
  id: string;
  name: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  rating: number;
  imageUrl?: string;
  isSubstitute: boolean;
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