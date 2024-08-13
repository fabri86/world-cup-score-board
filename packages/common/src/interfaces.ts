// TODO: include more interfaces

import { Team } from "./types";

export interface IGame {
  homeTeam: Team;
  awayTeam: Team;

  homeTeamGoals: number;
  awayTeamGoals: number;
}
