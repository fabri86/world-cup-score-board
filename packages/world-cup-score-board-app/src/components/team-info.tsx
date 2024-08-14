import cx from "classnames";
import Tippy from "@tippyjs/react";
import { IoFootballSharp } from "react-icons/io5";
import { GameTeam, Team } from "@world-cup/common";

type TeamInfoProps = {
  team: Team;
  goals: number;
  onGoalScored: (
    _e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    team: GameTeam
  ) => void;
  isHome?: boolean;
};

export const TeamInfo = ({
  team,
  goals,
  onGoalScored,
  isHome,
}: TeamInfoProps) => {
  return (
    <div className="flex flex-col w-1/2 p-0">
      <div
        className={cx("flex text-lg gap-x-3 items-center", {
          "flex-row-reverse": !isHome,
          "self-end": isHome,
          "self-start": !isHome,
        })}
      >
        <Tippy content={<span>{team.name}</span>}>
          <span
            id={`team-${team.id}-tooltip`}
            className="overflow-hidden text-ellipsis text-nowrap max-w-28"
          >
            {team.name}
          </span>
        </Tippy>

        {/* TODO: add flag: <img alt={`${team.name} flag img`} src={team.flag} /> */}

        <span className="text-3xl font-semibold">{goals}</span>
      </div>

      <Tippy
        placement="bottom"
        content={<span>{`Goal for ${team.shortName}`}</span>}
      >
        <button
          className={cx(
            "text-2xl my-3 p-0.5 border border-gray-400 rounded-md border-gray bg-blue-400 hover:bg-green-400",
            {
              "self-end": isHome,
              "self-start": !isHome,
            }
          )}
          aria-label={
            isHome ? "home team scores a goal" : "away team scores a goal"
          }
          onClick={(e) =>
            onGoalScored(e, isHome ? GameTeam.HomeTeam : GameTeam.AwayTeam)
          }
        >
          <IoFootballSharp />
        </button>
      </Tippy>
    </div>
  );
};
