import { useEffect, useState } from "react";
import axios from "axios";

import { Team } from "@world-cup/common";
import { getTeamsUrl } from "../utils/url-helper";

interface IApiResponse {
  response: {
    teams: Team[];
  };
}

export const useFetchTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTeams = async () => {
      setIsLoading(true);
      setError("");

      try {
        const {
          data: {
            response: { teams },
          },
        } = await axios.get<IApiResponse>(getTeamsUrl(), {});

        const teamsDtoObjects = teams.map(({ name, shortName, id, crest }) => ({
          id,
          name,
          shortName,
          flag: crest,
        }));

        setTeams(teamsDtoObjects);
      } catch (error) {
        setError(
          "An error occurred fetching teams. Please reload the app and try again"
        );

        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return { teams, isLoading, error };
};
