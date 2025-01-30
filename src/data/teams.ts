import { Team } from '../types/game';

// UEFA (Eropa) - 55 tim
const europeTeams: Team[] = [
  {
    id: "fra",
    name: "France",
    flag: "/placeholder.svg",
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
    flag: "/placeholder.svg",
    players: [],
    coach: {
      id: "c_eng", 
      name: "Gareth Southgate",
      nationality: "English"
    },
    formation: "4-3-3",
    rating: 86
  },
  // ... 53 tim Eropa lainnya
];

// CONMEBOL (Amerika Selatan) - 10 tim
const southAmericaTeams: Team[] = [
  {
    id: "arg",
    name: "Argentina",
    flag: "/placeholder.svg",
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
    flag: "/placeholder.svg",
    players: [],
    coach: {
      id: "c_bra",
      name: "Dorival Júnior",
      nationality: "Brazilian"
    },
    formation: "4-3-3",
    rating: 85
  },
  // ... 8 tim Amerika Selatan lainnya
];

// AFC (Asia) - 47 tim
const asiaTeams: Team[] = [
  {
    id: "jpn",
    name: "Japan",
    flag: "/placeholder.svg",
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
    flag: "/placeholder.svg",
    players: [],
    coach: {
      id: "c_kor",
      name: "Jürgen Klinsmann",
      nationality: "German"
    },
    formation: "4-3-3",
    rating: 77
  },
  // ... 45 tim Asia lainnya
];

// CAF (Afrika) - 54 tim
const africaTeams: Team[] = [
  {
    id: "mar",
    name: "Morocco",
    flag: "/placeholder.svg",
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
    flag: "/placeholder.svg",
    players: [],
    coach: {
      id: "c_sen",
      name: "Aliou Cissé",
      nationality: "Senegalese"
    },
    formation: "4-3-3",
    rating: 79
  },
  // ... 52 tim Afrika lainnya
];

// CONCACAF (Amerika Utara & Tengah) - 41 tim
const northAmericaTeams: Team[] = [
  {
    id: "usa",
    name: "United States",
    flag: "/placeholder.svg",
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
    flag: "/placeholder.svg",
    players: [],
    coach: {
      id: "c_mex",
      name: "Jaime Lozano",
      nationality: "Mexican"
    },
    formation: "4-3-3",
    rating: 77
  },
  // ... 39 tim Amerika Utara & Tengah lainnya
];

// OFC (Oseania) - 13 tim
const oceaniaTeams: Team[] = [
  {
    id: "nzl",
    name: "New Zealand",
    flag: "/placeholder.svg",
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
    id: "ncl",
    name: "New Caledonia",
    flag: "/placeholder.svg",
    players: [],
    coach: {
      id: "c_ncl",
      name: "Jean-Luc Dourson",
      nationality: "French"
    },
    formation: "4-4-2",
    rating: 65
  },
  // ... 11 tim Oseania lainnya
];

export const allTeams: Team[] = [
  ...europeTeams,
  ...southAmericaTeams,
  ...asiaTeams,
  ...africaTeams,
  ...northAmericaTeams,
  ...oceaniaTeams
];

export const teamsByConfederation = {
  UEFA: europeTeams,
  CONMEBOL: southAmericaTeams,
  AFC: asiaTeams,
  CAF: africaTeams,
  CONCACAF: northAmericaTeams,
  OFC: oceaniaTeams
};