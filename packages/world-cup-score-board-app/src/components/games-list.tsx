import { Game, GameTeam } from "@world-cup/common";
import { GameTile } from "./game-tile";

type GamesListProps = {
  games: Game[];
  onGoalScored: (gameId: string, team: GameTeam) => void;
  onGameEnded: (gameId: string) => void;
};

// TODO useDeferredValue/useTransition

export const GamesList = ({
  games,
  onGoalScored,
  onGameEnded,
}: GamesListProps) => (
  <div className="grid grid-cols-4 gap-2 p-2 overflow-auto fl h-3/4">
    {games.map((game) => (
      <GameTile
        game={game}
        onGameEnded={onGameEnded}
        onGoalScored={onGoalScored}
        key={game.id}
      />
    ))}
  </div>
);
