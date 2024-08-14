import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { GamesManager } from "../games-manager";

import * as fetchTeamsModule from "../../hooks/use-fetch-teams";

vi.mock("./useFetchTeams");

describe("Games manager", () => {
  beforeEach(() => {
    vi.resetAllMocks();

    vi.spyOn(fetchTeamsModule, "useFetchTeams").mockReturnValue({
      teams: [
        {
          id: 1,
          name: "Italy",
          shortName: "ITA",
          flag: "",
        },
        {
          id: 2,
          name: "Poland",
          shortName: "POL",
          flag: "",
        },
        {
          id: 3,
          name: "Brazil",
          shortName: "BRA",
          flag: "",
        },
        {
          id: 4,
          name: "Germany",
          shortName: "GER",
          flag: "",
        },
      ],
      isLoading: false,
      error: "",
    });
  });

  it("should create a game with the default live score", () => {
    render(<GamesManager />);

    const homeTeamSelector = screen.getByRole("combobox", {
      name: "select home team",
    });

    fireEvent.change(homeTeamSelector, {
      target: { value: 1 },
    });

    const awayTeamSelector = screen.getByRole("combobox", {
      name: "select away team",
    });

    fireEvent.change(awayTeamSelector, { target: { value: 2 } });

    const createButton = screen.getByRole("button", { name: "kick off game" });

    expect(createButton).toBeInTheDocument();

    fireEvent.click(createButton);

    const newTile = screen.getByTestId("tile 1-vs-2");
    expect(newTile).toBeInTheDocument();

    const homeTeamText = within(newTile).getByText(/italy/i);
    const awayTeamText = within(newTile).getByText(/poland/i);

    expect(homeTeamText).toBeInTheDocument();
    expect(awayTeamText).toBeInTheDocument();
    expect(screen.getAllByText("0")).toHaveLength(2);
  });

  it("should update the result of a game when the home team scores a goal", () => {
    render(<GamesManager />);

    const homeTeamSelector = screen.getByRole("combobox", {
      name: "select home team",
    });

    fireEvent.change(homeTeamSelector, {
      target: { value: 1 },
    });

    const awayTeamSelector = screen.getByRole("combobox", {
      name: "select away team",
    });

    fireEvent.change(awayTeamSelector, { target: { value: 2 } });

    const createButton = screen.getByRole("button", { name: "kick off game" });

    fireEvent.click(createButton);

    expect(screen.getAllByText("0")).toHaveLength(2);

    const increaseHomeGoalsButton = screen.getByRole("button", {
      name: "home team scores a goal",
    });

    fireEvent.click(increaseHomeGoalsButton);

    const tile = screen.getByTestId("tile 1-vs-2");
    const homeGoals = within(tile).getByText("1");
    const awayGoals = within(tile).getByText("0");

    expect(homeGoals).toBeInTheDocument();
    expect(awayGoals).toBeInTheDocument();
  });

  it("should update the result of a game when the away team scores a few goals", () => {
    render(<GamesManager />);

    const homeTeamSelector = screen.getByRole("combobox", {
      name: "select home team",
    });

    fireEvent.change(homeTeamSelector, {
      target: { value: 3 },
    });

    const awayTeamSelector = screen.getByRole("combobox", {
      name: "select away team",
    });

    fireEvent.change(awayTeamSelector, { target: { value: 4 } });

    const createButton = screen.getByRole("button", { name: "kick off game" });

    fireEvent.click(createButton);

    expect(screen.getAllByText("0")).toHaveLength(2);

    const increaseAwayGoalsButton = screen.getByRole("button", {
      name: "away team scores a goal",
    });

    fireEvent.click(increaseAwayGoalsButton);
    fireEvent.click(increaseAwayGoalsButton);
    fireEvent.click(increaseAwayGoalsButton);

    const tile = screen.getByTestId("tile 3-vs-4");
    const homeGoals = within(tile).getByText("0");
    const awayGoals = within(tile).getByText("3");

    expect(homeGoals).toBeInTheDocument();
    expect(awayGoals).toBeInTheDocument();

    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("should remove the game from the scoreboard when the the game gets marked as finished", () => {
    render(<GamesManager />);

    const homeTeamSelector = screen.getByRole("combobox", {
      name: "select home team",
    });

    fireEvent.change(homeTeamSelector, {
      target: { value: 3 },
    });

    const awayTeamSelector = screen.getByRole("combobox", {
      name: "select away team",
    });

    fireEvent.change(awayTeamSelector, { target: { value: 4 } });

    const createButton = screen.getByRole("button", { name: "kick off game" });

    fireEvent.click(createButton);

    const tile = screen.getByTestId("tile 3-vs-4");

    const homeTeamText = within(tile).getByText(/brazil/i);
    const awayTeamText = within(tile).getByText(/germany/i);

    expect(homeTeamText).toBeInTheDocument();
    expect(awayTeamText).toBeInTheDocument();

    const endGameButton = screen.getByRole("button", {
      name: "end game 3-vs-4",
    });

    fireEvent.click(endGameButton);

    expect(screen.queryByTestId("tile 3-vs-4")).not.toBeInTheDocument();
  });
});
