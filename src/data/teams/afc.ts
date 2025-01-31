import { Team } from '../../types/game';

export const afcTeams: Team[] = [
  {
    id: "jpn",
    name: "Japan",
    flag: "/flags/jpn.svg",
    players: [],
    coach: {
      id: "c_jpn",
      name: "Hajime Moriyasu",
      nationality: "Japanese"
    },
    formation: "4-2-3-1",
    rating: 78
  },
  {
    id: "kor",
    name: "South Korea",
    flag: "/flags/kor.svg",
    players: [],
    coach: {
      id: "c_kor",
      name: "Jürgen Klinsmann",
      nationality: "German"
    },
    formation: "4-3-3",
    rating: 77
  },
  // ... 45 tim AFC lainnya
];