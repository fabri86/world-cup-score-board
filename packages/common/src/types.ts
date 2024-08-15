import { Moment } from "moment";

export type Team = {
  id: number;
  name: string;
  shortName: string;
  crest?: string;
  flag?: string;
};

export type Game = {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeTeamGoals: number;
  awayTeamGoals: number;
  isFinished: boolean;
  kickOff: Moment;
};

export enum GameTeam {
  HomeTeam = 1,
  AwayTeam = 2,
}

export enum Teams {
  HOME = "home",
  AWAY = "away",
}
