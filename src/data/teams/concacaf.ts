import { Team } from '../../types/game';

export const concacafTeams: Team[] = [
  {
    id: "usa",
    name: "United States",
    flag: "/flags/usa.svg",
    players: [],
    coach: {
      id: "c_usa",
      name: "Gregg Berhalter",
      nationality: "American"
    },
    formation: "4-3-3",
    rating: 78
  },
  {
    id: "mex",
    name: "Mexico",
    flag: "/flags/mex.svg",
    players: [],
    coach: {
      id: "c_mex",
      name: "Jaime Lozano",
      nationality: "Mexican"
    },
    formation: "4-3-3",
    rating: 77
  },
  // ... 39 tim CONCACAF lainnya
];