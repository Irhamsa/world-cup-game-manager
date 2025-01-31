import { Team } from '../../types/game';

export const ofcTeams: Team[] = [
  {
    id: "nzl",
    name: "New Zealand",
    flag: "/flags/nzl.svg",
    players: [],
    coach: {
      id: "c_nzl",
      name: "Darren Bazeley",
      nationality: "English"
    },
    formation: "4-4-2",
    rating: 72
  },
  {
    id: "tah",
    name: "Tahiti",
    flag: "/flags/tah.svg",
    players: [],
    coach: {
      id: "c_tah",
      name: "Samuel Garcia",
      nationality: "French"
    },
    formation: "4-4-2",
    rating: 65
  },
  // ... 11 tim OFC lainnya
];