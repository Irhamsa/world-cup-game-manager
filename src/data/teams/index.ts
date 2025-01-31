import { Team } from '../../types/game';
import { uefaTeams } from './uefa';
import { conmebolTeams } from './conmebol';
import { afcTeams } from './afc';
import { cafTeams } from './caf';
import { concacafTeams } from './concacaf';
import { ofcTeams } from './ofc';

export const allTeams: Team[] = [
  ...uefaTeams,
  ...conmebolTeams,
  ...afcTeams,
  ...cafTeams,
  ...concacafTeams,
  ...ofcTeams
];

export const teamsByConfederation = {
  UEFA: uefaTeams,
  CONMEBOL: conmebolTeams,
  AFC: afcTeams,
  CAF: cafTeams,
  CONCACAF: concacafTeams,
  OFC: ofcTeams
};