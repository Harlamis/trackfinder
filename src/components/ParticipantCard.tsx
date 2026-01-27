import ConditionBadge from "./ConditionBadge";
import type { ICondition } from "./ConditionBadge";

export interface IParticipant {
  base_id: number;
  name: string;
  current_health: number;
  max_health: number;
  armor_class: number;
  initiative: number;
  conditions: ICondition[];
}

const ParticipantCard = ({
  initiative,
  name,
  armor_class,
  current_health,
  max_health,
  conditions,
}: IParticipant) => {
  return (
    <div
      className="
      grid grid-cols-[40px_1fr_auto] grid-rows-[auto_auto] 
      md:grid-cols-[48px_1fr_80px_120px_180px] md:grid-rows-1
      
      relative z-10 hover:z-50 items-center w-full 
      p-3 md:px-6 md:h-16 
      bg-surface border-2 border-text-secondary/20 rounded-2xl 
      gap-x-3 gap-y-2 transition-all
      hover:border-accent 
      hover:shadow-[0_0_20px_-5px_rgba(240,185,11,0.3)]
      hover:-translate-y-1
    "
    >
      <div className="row-span-1 md:row-span-1 flex items-center justify-center">
        <span className="text-accent font-bold text-lg md:text-xl leading-none">
          {initiative}
        </span>
      </div>

      <div className="flex flex-col justify-center min-w-0">
        <span className="text-text-primary font-bold truncate text-sm md:text-base">
          {name}
        </span>
      </div>

      <div className="flex flex-col items-end md:items-center justify-center">
        <span className="hidden md:block text-[10px] text-text-secondary uppercase">
          Health
        </span>
        <span className="text-status-warning font-mono font-bold text-sm md:text-base">
          {current_health}
          <span className="text-text-secondary/50 md:inline">
            /{max_health}
          </span>
        </span>
      </div>

      <div className="col-start-2 row-start-2 md:col-start-3 md:row-start-1 flex items-center gap-2 md:flex-col md:gap-0">
        <span className="text-[10px] text-text-secondary uppercase">AC</span>
        <span className="text-text-primary text-sm font-bold md:font-normal">
          {armor_class}
        </span>
      </div>

      <div className="col-start-3 row-start-2 md:col-start-5 md:row-start-1 flex justify-end items-center">
        <div className="relative group/overlay flex justify-end">
          {conditions.length > 0 && (
            <div className="flex gap-1 items-center">
              <ConditionBadge
                type={conditions[0].type}
                value={conditions[0].value}
              />
              {conditions.length > 1 && (
                <div className="bg-accent/20 text-accent text-[9px] px-1.5 py-0.5 rounded-full border border-accent/40">
                  +{conditions.length - 1}
                </div>
              )}
            </div>
          )}
          <div
            className="
            absolute top-[calc(100%+8px)] right-0 z-50 w-28 p-3
            bg-surface border border-accent/30 rounded-xl shadow-2xl
            invisible group-hover/overlay:visible transition-all
            flex flex-col gap-2 items-center
          "
          >
            <span className="text-[10px] text-text-secondary uppercase border-b border-accent/10 pb-1 mb-1 font-bold">
              Extra Conditions
            </span>
            {conditions.slice(1).map((c, i) => (
              <ConditionBadge key={i} type={c.type} value={c.value} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ParticipantCard;
