import { ChangeEvent, useCallback, useMemo } from "react";
import { Team, Teams } from "@world-cup/common";

export type TeamSelectorProps = {
  isHome: boolean;
  teams: Team[];
  selected: Team | null;
  onSelectedTeam: (selectedTeamId: number) => void;
};

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
      <span className="text-black capitalize">{`${
        isHome ? Teams.HOME : Teams.AWAY
      }:`}</span>
      <select
        className="w-full outline-none"
        aria-label={`select ${isHome ? Teams.HOME : Teams.AWAY} team`}
        value={selected?.id ?? ""}
        onChange={handleSelectedValue}
      >
        <option aria-label="select empty value" value="" disabled>
          Select a team
        </option>
        {teamsOptions.map(({ id, name }) => (
          <option
            aria-label={`select ${
              isHome ? Teams.HOME : Teams.AWAY
            } option ${name}`}
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
