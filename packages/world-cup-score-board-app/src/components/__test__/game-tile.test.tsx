import { fireEvent, render, screen } from "@testing-library/react";

import { Game, GameTeam } from "@world-cup/common";
import { GameTile } from "../game-tile";

describe("Game tile", () => {
  const game: Game = {
    id: "1-vs-2",
    homeTeam: {
      id: 1,
      name: "Italy",
      shortName: "ITA",
      flag: "ita-flag-mock-url",
    },
    awayTeam: {
      id: 2,
      name: "Poland",
      shortName: "POL",
      flag: "pol-flag-mock-url",
    },
    isFinished: false,
    homeTeamGoals: 1,
    awayTeamGoals: 0,
  };

  it("should display the info about a game", () => {
    render(
      <GameTile game={game} onGoalScored={vi.fn()} onGameFinished={vi.fn()} />
    );

    expect(screen.getByText(/italy/i)).toBeInTheDocument();
    expect(screen.getByText(/poland/i)).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should present a button to increase the amount of goals scored by the home team", () => {
    const mockGoalFn = vi.fn();

    render(
      <GameTile
        game={game}
        onGoalScored={mockGoalFn}
        onGameFinished={vi.fn()}
      />
    );

    const homeTeamScoresButton = screen.getByRole("button", {
      name: "home team scores",
    });

    expect(homeTeamScoresButton).toBeInTheDocument();

    fireEvent.click(homeTeamScoresButton);

    expect(mockGoalFn).toHaveBeenCalledWith("1-vs-2", GameTeam.HomeTeam);
  });

  it("should present a button to increase the amount of goals scored by the away team", () => {
    const mockGoalFn = vi.fn();

    render(
      <GameTile
        game={game}
        onGoalScored={mockGoalFn}
        onGameFinished={vi.fn()}
      />
    );

    const awayTeamScoresButton = screen.getByRole("button", {
      name: "away team scores",
    });

    expect(awayTeamScoresButton).toBeInTheDocument();

    fireEvent.click(awayTeamScoresButton);

    expect(mockGoalFn).toHaveBeenCalledWith("1-vs-2", GameTeam.AwayTeam);
  });

  it("should present a button to mark the game as finished", () => {
    const mockEndFn = vi.fn();

    render(
      <GameTile game={game} onGoalScored={vi.fn()} onGameFinished={mockEndFn} />
    );

    const endButton = screen.getByRole("button", {
      name: "end game 1-vs-2",
    });

    expect(endButton).toBeInTheDocument();

    fireEvent.click(endButton);

    expect(mockEndFn).toHaveBeenCalledWith(expect.any(Object), "1-vs-2");
  });
});
