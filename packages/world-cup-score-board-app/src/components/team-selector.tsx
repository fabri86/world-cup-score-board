import { ChangeEvent, useCallback, useMemo } from "react";
import { Team } from "@world-cup/common";

export type TeamSelectorProps = {
  isHome: boolean;
  teams: Team[];
  selected: Team | null;
  onSelectedTeam: (selectedTeamId: number) => void;
};

// TODO reduce the amount of hard coded values
export const TeamSelector = ({
  isHome,
  teams,
  selected,
  onSelectedTeam,
}: TeamSelectorProps) => {
  const teamsOptions = useMemo(() => teams, [teams]);

  const handleSelectedValue = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const { value: selectedTeamId } = e.target;

      if (selectedTeamId) {
        onSelectedTeam(Number.parseInt(selectedTeamId, 10));
      }
    },
    [onSelectedTeam]
  );

  return (
    <div className="flex flex-grow gap-x-2">
      <span className="text-black">{isHome ? "Home:" : "Away:"}</span>
      <select
        className="w-full outline-none"
        aria-label={`select ${isHome ? "home" : "away"} team`}
        value={selected?.id ?? ""}
        onChange={handleSelectedValue}
      >
        <option aria-label="select empty value" value="" disabled>
          Select a team
        </option>
        {teamsOptions.map(({ id, name }) => (
          <option
            aria-label={`select ${isHome ? "home" : "away"} option ${name}`}
            key={`team-${id}-option`}
            value={id}
          >
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
