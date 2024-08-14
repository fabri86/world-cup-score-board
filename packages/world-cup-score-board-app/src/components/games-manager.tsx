import { Game, GameTeam, Team } from "@world-cup/common";
import { GamesList } from ".//games-list";
import { useCallback, useState } from "react";
import { useFetchTeams } from "./../hooks/use-fetch-teams";
import { TeamSelector } from "./team-selector";

export const GamesManager = () => {
  const { teams, isLoading, error: loadingError } = useFetchTeams();

  const [selectedHomeTeam, setSelectedHomeTeam] = useState<Team | null>(null);
  const [selectedAwayTeam, setSelectedAwayTeam] = useState<Team | null>(null);

  const [liveGames, setLiveGames] = useState<Game[]>([]);

  const onCreateGameHandler = useCallback(() => {
    if (!selectedHomeTeam || !selectedAwayTeam) {
      // TODO toast error: 'please select two teams'
      return;
    }

    if (
      liveGames.find(
        (game) =>
          game.homeTeam.id === selectedHomeTeam.id ||
          game.awayTeam.id === selectedHomeTeam.id ||
          game.homeTeam.id === selectedAwayTeam.id ||
          game.awayTeam.id === selectedAwayTeam.id
      )
    ) {
      // TODO toast error: 'one of the selected teams is already playing a game'
      return;
    }

    const newGame: Game = {
      id: `${selectedHomeTeam.id}-vs-${selectedAwayTeam.id}`,
      homeTeam: { ...selectedHomeTeam },
      awayTeam: { ...selectedAwayTeam },
      homeTeamGoals: 0,
      awayTeamGoals: 0,
      isFinished: false,
    };

    // TODO games must be reordered (unfortunately) by max number of total goals
    setLiveGames([...liveGames, newGame]);
  }, [selectedAwayTeam, selectedHomeTeam, liveGames]);

  const onSelectedHomeTeamHandler = useCallback(
    (selectedHomeTeamId: number) => {
      const searchedTeam = teams.find((team) => team.id === selectedHomeTeamId);

      setSelectedHomeTeam(searchedTeam ?? null);
    },
    [teams]
  );

  const onSelectedAwayTeamHandler = useCallback(
    (selectedHomeTeamId: number) => {
      const searchedTeam = teams.find((team) => team.id === selectedHomeTeamId);

      setSelectedAwayTeam(searchedTeam ?? null);
    },
    [teams]
  );

  const onGoalScoredHandler = useCallback(
    (gameId: string, team: GameTeam) => {
      const gameIdx = liveGames.findIndex((game) => game.id === gameId);
      if (gameIdx !== -1) {
        const updatedGames = [...liveGames];

        if (team === GameTeam.HomeTeam) {
          updatedGames[gameIdx].homeTeamGoals++;
        } else {
          updatedGames[gameIdx].awayTeamGoals++;
        }

        setLiveGames(updatedGames);
      }
    },
    [liveGames]
  );

  const onEndedGameHandler = useCallback(
    (gameId: string) => {
      const searchedIndex = liveGames.findIndex((game) => game.id === gameId);
      if (searchedIndex !== -1) {
        const updatedGames = [
          ...liveGames.slice(0, searchedIndex),
          ...liveGames.slice(searchedIndex + 1),
        ];

        setLiveGames(updatedGames);
      }
    },
    [liveGames]
  );

  // TODO: introduce ERROR BOUNDARY?
  if (loadingError) {
    return (
      <p className="text-red-400">
        An error occurred while fetching teams. Please try later
      </p>
    );
  }

  return isLoading ? (
    <div>Loading teams...</div>
  ) : (
    // TODO introduce LOADER component?
    <>
      <GamesList
        games={liveGames}
        onGoalScored={onGoalScoredHandler}
        onGameEnded={onEndedGameHandler}
      />

      <div className="absolute flex flex-col items-center justify-center w-1/3 p-4 transform -translate-x-1/2 bg-gray-100 border border-gray-300 rounded-md shadow-md h-26 left-1/2 bottom-10 gap-y-3">
        <div className="flex justify-center w-full gap-x-5">
          <TeamSelector
            isHome
            teams={teams}
            selected={selectedHomeTeam}
            onSelectedTeam={onSelectedHomeTeamHandler}
          />
          <TeamSelector
            isHome={false}
            teams={teams}
            selected={selectedAwayTeam}
            onSelectedTeam={onSelectedAwayTeamHandler}
          />
        </div>

        <button
          className="px-4 py-1 text-white bg-blue-400 border border-gray-300 rounded-md hover:bg-blue-600"
          aria-label="kick off game"
          onClick={onCreateGameHandler}
        >
          START MATCH
        </button>
      </div>
    </>
  );
};
