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
};

export enum GameTeam {
  HomeTeam = 1,
  AwayTeam = 2,
}
