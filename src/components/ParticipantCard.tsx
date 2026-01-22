import ConditionBadge from "./ConditionBadge";

export interface IParticipant {
  base_id: number;
  name: string;
  current_health: number;
  max_health: number;
  armor_class: number;
  initiative: number;
}

const ParticipantCard = ({
  base_id,
  name,
  current_health,
  max_health,
  armor_class,
  initiative,
}: IParticipant) => {
  return (
    <div className="flex justify-between items-center w-full h-16 border-2 rounded-2xl border-text-secondary px-2 transition-all hover:border-accent hover:shadow-lg hover:-translate-y-px cursor-pointer">
      <span className="text-accent">{initiative}</span>
      <span className="text-text-primary">{name}</span>
      <span className="text-text-secondary">{armor_class}</span>
      <span className="text-status-warning">
        {current_health}/{max_health}
      </span>
      <ConditionBadge type="Dazed" />
    </div>
  );
};
export default ParticipantCard;
