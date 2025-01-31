import { Team } from '../../types/game';

export const cafTeams: Team[] = [
  {
    id: "mar",
    name: "Morocco",
    flag: "/flags/mar.svg",
    players: [],
    coach: {
      id: "c_mar",
      name: "Walid Regragui",
      nationality: "Moroccan"
    },
    formation: "4-3-3",
    rating: 81
  },
  {
    id: "sen",
    name: "Senegal",
    flag: "/flags/sen.svg",
    players: [],
    coach: {
      id: "c_sen",
      name: "Aliou Cissé",
      nationality: "Senegalese"
    },
    formation: "4-3-3",
    rating: 79
  },
  // ... 52 tim CAF lainnya
];