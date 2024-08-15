import { Game, Team } from "@world-cup/common";

export const isTeamPlayingGame = (team: Team, game: Game) =>
  team.id === game.homeTeam.id || team.id === game.awayTeam.id;

export const findGamesWithTeams = ({
  games,
  homeTeam,
  awayTeam,
}: {
  games: Game[];
  homeTeam: Team;
  awayTeam: Team;
}): Game | undefined =>
  games.find(
    (game) =>
      game.homeTeam.id === homeTeam.id ||
      game.awayTeam.id === homeTeam.id ||
      game.homeTeam.id === awayTeam.id ||
      game.awayTeam.id === awayTeam.id
  );
