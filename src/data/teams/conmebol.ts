import { Team } from '../../types/game';

export const conmebolTeams: Team[] = [
  {
    id: "arg",
    name: "Argentina",
    flag: "/flags/arg.svg",
    players: [],
    coach: {
      id: "c_arg",
      name: "Lionel Scaloni",
      nationality: "Argentinian"
    },
    formation: "4-3-3",
    rating: 88
  },
  {
    id: "bra",
    name: "Brazil",
    flag: "/flags/bra.svg",
    players: [],
    coach: {
      id: "c_bra",
      name: "Dorival Júnior",
      nationality: "Brazilian"
    },
    formation: "4-3-3",
    rating: 87
  },
  // ... 8 tim CONMEBOL lainnya
];