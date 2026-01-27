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
  base_id,
  name,
  current_health,
  max_health,
  armor_class,
  initiative,
  conditions,
}: IParticipant) => {
  return (
    <div
      className="
        grid 
        grid-cols-[48px_1fr_60px_100px_160px] 
        items-center 
        w-full 
        h-16 
        border-2 
        rounded-2xl 
        border-text-secondary/30 
        px-6 
        gap-4
        transition-all 
        hover:border-accent 
        hover:shadow-[0_0_15px_-3px_rgba(240,185,11,0.2)] 
        hover:-translate-y-px 
        hover:z-50
        cursor-pointer
        bg-surface
        group
      "
    >
      <span className="text-accent font-bold text-xl">{initiative}</span>

      <span className="text-text-primary font-medium truncate">{name}</span>

      <div className="flex flex-col items-center">
        <span className="text-[10px] text-text-secondary uppercase">AC</span>
        <span className="text-text-primary">{armor_class}</span>
      </div>

      <div className="flex flex-col items-end">
        <span className="text-[10px] text-text-secondary uppercase">
          Health
        </span>
        <span className="text-status-warning font-mono">
          {current_health}/{max_health}
        </span>
      </div>

      <div className="relative flex justify-end items-center h-full group">
        {conditions.length > 0 && (
          <div className="flex items-center gap-2">
            {/* 1. Перший основний стан */}
            <ConditionBadge
              type={conditions[0].type}
              value={conditions[0].value}
            />

            {/* 2. Бейдж "+N", який слугує тригером */}
            {conditions.length > 1 && (
              <div className="relative">
                <div className="bg-accent/20 text-accent text-xs px-2 py-1 rounded-full border border-accent/40 cursor-help font-bold">
                  +{conditions.length - 1}
                </div>

                {/* 3. Оверлей (Випадаючий список) */}
                <div
                  className="
            absolute 
            top-full 
            right-0 
            mt-2 
            z-99
            invisible 
            group-hover:visible 
            opacity-0 
            group-hover:opacity-100 
            transition-all 
            duration-200 
            bg-surface 
            border 
            border-accent/30 
            p-3 
            rounded-xl 
            shadow-2xl 
            flex 
            flex-col 
            gap-2 
            min-w-35
          "
                >
                  <span className="text-[10px] text-text-secondary uppercase font-bold border-b border-accent/10 pb-1 mb-1">
                    Extra Conditions
                  </span>
                  {/* Виводимо всі стани, крім першого, який вже на екрані */}
                  {conditions.slice(1).map((condition, idx) => (
                    <ConditionBadge
                      key={idx}
                      type={condition.type}
                      value={condition.value}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default ParticipantCard;
