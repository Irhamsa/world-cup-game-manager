import { Team, PlayingStyle } from '../types/game';

interface AiTactics {
  formation: string;
  playingStyle: PlayingStyle;
  pressureLevel: number;
  width: number;
  depth: number;
  lineup: string[];
}

export const calculateAiTactics = (aiTeam: Team, playerTeam: Team): AiTactics => {
  // Calculate team strength difference
  const aiTeamAvgRating = aiTeam.players.reduce((sum, p) => sum + p.rating, 0) / aiTeam.players.length;
  const playerTeamAvgRating = playerTeam.players.reduce((sum, p) => sum + p.rating, 0) / playerTeam.players.length;
  const ratingDiff = aiTeamAvgRating - playerTeamAvgRating;

  // Determine playing style based on team strengths
  let playingStyle: PlayingStyle;
  if (ratingDiff > 5) {
    playingStyle = 'POSSESSION';
  } else if (ratingDiff < -5) {
    playingStyle = 'DEFENSIVE';
  } else {
    const styles: PlayingStyle[] = ['BALANCED', 'COUNTER_ATTACK', 'HIGH_PRESS'];
    playingStyle = styles[Math.floor(Math.random() * styles.length)];
  }

  // Select formation based on player strengths
  const formations = ['4-4-2', '4-3-3', '4-2-3-1', '3-5-2', '5-3-2'];
  const defenderStrength = aiTeam.players.filter(p => p.position === 'DEF')
    .reduce((sum, p) => sum + p.rating, 0);
  const midfielderStrength = aiTeam.players.filter(p => p.position === 'MID')
    .reduce((sum, p) => sum + p.rating, 0);
  const forwardStrength = aiTeam.players.filter(p => p.position === 'FWD')
    .reduce((sum, p) => sum + p.rating, 0);

  let formation: string;
  if (defenderStrength > midfielderStrength && defenderStrength > forwardStrength) {
    formation = '5-3-2';
  } else if (midfielderStrength > defenderStrength && midfielderStrength > forwardStrength) {
    formation = '4-5-1';
  } else {
    formation = '4-3-3';
  }

  // Select best players for each position
  const lineup = [
    // GK
    ...aiTeam.players.filter(p => p.position === 'GK')
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 1)
      .map(p => p.id),
    // DEF
    ...aiTeam.players.filter(p => p.position === 'DEF')
      .sort((a, b) => b.rating - a.rating)
      .slice(0, formation.startsWith('5') ? 5 : formation.startsWith('3') ? 3 : 4)
      .map(p => p.id),
    // MID
    ...aiTeam.players.filter(p => p.position === 'MID')
      .sort((a, b) => b.rating - a.rating)
      .slice(0, formation.split('-')[1] ? parseInt(formation.split('-')[1]) : 4)
      .map(p => p.id),
    // FWD
    ...aiTeam.players.filter(p => p.position === 'FWD')
      .sort((a, b) => b.rating - a.rating)
      .slice(0, formation.split('-')[2] ? parseInt(formation.split('-')[2]) : 2)
      .map(p => p.id),
  ];

  return {
    formation,
    playingStyle,
    pressureLevel: playingStyle === 'HIGH_PRESS' ? 80 : playingStyle === 'DEFENSIVE' ? 30 : 50,
    width: playingStyle === 'POSSESSION' ? 70 : playingStyle === 'COUNTER_ATTACK' ? 40 : 50,
    depth: playingStyle === 'DEFENSIVE' ? 30 : playingStyle === 'HIGH_PRESS' ? 70 : 50,
    lineup
  };
};