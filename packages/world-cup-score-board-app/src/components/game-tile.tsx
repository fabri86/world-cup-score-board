import { useCallback } from "react";
import { CgMediaLive } from "react-icons/cg";
import { Game, GameTeam } from "@world-cup/common";

import { TeamInfo } from "../components/team-info";

type GameTileProps = {
  game: Game;
  onGameEnded: (gameId: string) => void;
  onGoalScored: (gameId: string, team: GameTeam) => void;
};

export const GameTile = ({
  game,
  onGameEnded,
  onGoalScored,
}: GameTileProps) => {
  const onGoalScoredHandler = useCallback(
    (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>, team: GameTeam) => {
      onGoalScored(game.id, team);
    },
    [game, onGoalScored]
  );

  return (
    <div
      className="relative flex justify-center h-40 p-6 px-3 bg-gray-100 border border-gray-300 rounded-md shadow-md w-96"
      data-testid={`tile ${game.id}`}
    >
      <div className="flex justify-center w-full gap-x-5">
        <TeamInfo
          team={game.homeTeam}
          goals={game.homeTeamGoals}
          onGoalScored={onGoalScoredHandler}
          isHome={true}
        />

        <TeamInfo
          team={game.awayTeam}
          goals={game.awayTeamGoals}
          onGoalScored={onGoalScoredHandler}
          isHome={false}
        />
      </div>

      {!game.isFinished && (
        <span className="absolute flex items-center text-red-600 top-2 right-2 animate-pulse gap-x-1">
          <span className="text-sm font-semibold">LIVE</span>
          <CgMediaLive
            aria-labelledby={`${game.homeTeam.id}-vs-${game.awayTeam.id}-game-live`}
          />
        </span>
      )}

      {!game.isFinished && (
        <span className="absolute bottom-2">
          <button
            className="p-1 px-2 text-sm font-semibold text-white bg-green-600 border border-gray-300 rounded-md hover:bg-yellow-400"
            aria-label={`end game ${game.id}`}
            onClick={() => onGameEnded(game.id)}
          >
            END MATCH
          </button>
        </span>
      )}
    </div>
  );
};
