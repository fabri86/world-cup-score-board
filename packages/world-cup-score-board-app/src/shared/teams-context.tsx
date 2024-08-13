import { createContext, ReactElement } from "react";
import { useFetchTeams } from "../hooks/use-fetch-teams";

import { Team } from "@world-cup/common";

export const TeamsContext = createContext<
  | {
      teams: Team[];
      isLoading: boolean;
      error: string;
    }
  | undefined
>(undefined);

type TeamsProviderContext = {
  children: ReactElement;
};

export const TeamsProvider = ({ children }: TeamsProviderContext) => {
  const teamsData = useFetchTeams();

  return (
    <TeamsContext.Provider value={teamsData}>{children}</TeamsContext.Provider>
  );
};
