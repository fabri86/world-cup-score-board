import { useContext } from "react";

import { TeamsContext } from "../shared/teams-context";
import { Team } from "@world-cup/common";

export const TeamsList = () => {
  const teamsData = useContext(TeamsContext);

  return teamsData?.isLoading ? (
    <div>Loading teams...</div>
  ) : (
    <div>
      {(teamsData?.teams as Team[])?.map(({ id, name, shortName }) => (
        <li key={`${shortName}-team-item-${id}`}>{name}</li>
      ))}
    </div>
  );
};
