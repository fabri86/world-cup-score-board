import { useMemo } from "react";
import moment from "moment";
import { Game, GameTeam } from "@world-cup/common";
import { GameTile } from "./game-tile";

type GamesListProps = {
  games: Game[];
  onGoalScored: (gameId: string, team: GameTeam) => void;
  onGameEnded: (gameId: string) => void;
};

export const GamesList = ({
  games,
  onGoalScored,
  onGameEnded,
}: GamesListProps) => {
  const orderedGames = useMemo(
    () =>
      games.sort((a, b) => {
        const goalDifference =
          b.homeTeamGoals +
          b.awayTeamGoals -
          (a.homeTeamGoals + a.awayTeamGoals);

        if (goalDifference !== 0) {
          return goalDifference;
        }

        return moment(b.kickOff).diff(a.kickOff);
      }),
    [games]
  );

  return (
    <div className="grid grid-cols-4 gap-2 p-0 overflow-auto auto-rows-min fl h-3/4">
      {orderedGames.map((game) => (
        <GameTile
          game={game}
          onGameEnded={onGameEnded}
          onGoalScored={onGoalScored}
          key={game.id}
        />
      ))}
    </div>
  );
};
