import { Team } from '../../types/game';

export const uefaTeams: Team[] = [
  {
    id: "fra",
    name: "France",
    flag: "/flags/fra.svg",
    players: [],
    coach: {
      id: "c_fra",
      name: "Didier Deschamps",
      nationality: "French"
    },
    formation: "4-2-3-1",
    rating: 87
  },
  {
    id: "eng",
    name: "England",
    flag: "/flags/eng.svg",
    players: [],
    coach: {
      id: "c_eng",
      name: "Gareth Southgate",
      nationality: "English"
    },
    formation: "4-3-3",
    rating: 86
  },
  {
    id: "ger",
    name: "Germany",
    flag: "/flags/ger.svg",
    players: [],
    coach: {
      id: "c_ger",
      name: "Julian Nagelsmann",
      nationality: "German"
    },
    formation: "4-2-3-1",
    rating: 85
  },
  // ... 52 tim UEFA lainnya
];