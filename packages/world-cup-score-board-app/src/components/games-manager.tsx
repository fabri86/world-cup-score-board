import { Game, GameTeam, Team } from "@world-cup/common";
import { GamesList } from ".//games-list";
import { useCallback, useState } from "react";
import { useFetchTeams } from "./../hooks/use-fetch-teams";
import { TeamSelector } from "./team-selector";
import { toast } from "react-toastify";
import {
  findGamesWithTeams,
  isTeamPlayingGame,
} from "../utils/games-validator";

export const GamesManager = () => {
  const { teams, isLoading, error: loadingError } = useFetchTeams();

  const [selectedHomeTeam, setSelectedHomeTeam] = useState<Team | null>(null);
  const [selectedAwayTeam, setSelectedAwayTeam] = useState<Team | null>(null);

  const [liveGames, setLiveGames] = useState<Game[]>([]);

  const onCreateGameHandler = useCallback(() => {
    if (!selectedHomeTeam || !selectedAwayTeam) {
      return toast.error("Please select two teams");
    }

    if (selectedHomeTeam === selectedAwayTeam) {
      return toast.error("Please select two different teams");
    }

    const gameWithSelectedTeams = findGamesWithTeams({
      games: liveGames,
      homeTeam: selectedHomeTeam,
      awayTeam: selectedAwayTeam,
    });

    if (gameWithSelectedTeams) {
      return isTeamPlayingGame(selectedHomeTeam, gameWithSelectedTeams)
        ? toast.error(`${selectedHomeTeam.name} is already playing a game`)
        : toast.error(`${selectedAwayTeam.name} is already playing a game`);
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
    // TODO if same score, by most recent!!
    setLiveGames([...liveGames, newGame]);

    toast.success(
      `${selectedHomeTeam.name} vs ${selectedAwayTeam.name} kicked off`
    );
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
        const game = updatedGames[gameIdx];

        if (team === GameTeam.HomeTeam) {
          game.homeTeamGoals++;
          toast.success(`${game.homeTeam.name} scored a goal!`);
        } else {
          game.awayTeamGoals++;
          toast.success(`${game.awayTeam.name} scored a goal!`);
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

        const endedGame = liveGames[searchedIndex];

        toast.info(
          `Final whistle for ${endedGame.homeTeam.name}-${endedGame.awayTeam.name}. What a game!`
        );
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
