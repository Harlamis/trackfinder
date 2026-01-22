export interface IParticipant {
  base_id: number;
  name: string;
  health: number;
  armor_class: number;
  initiative: number;
}

const ParticipantCard = ({
  base_id,
  name,
  health,
  armor_class,
  initiative,
}: IParticipant) => {
  return (
    <div className="flex justify-between w-full h-32">
      <span className="text-accent">{initiative}</span>
      <span className="text-text-secondary">{armor_class}</span>
      <span className="text-status-warning">{health}</span>
    </div>
  );
};
export default ParticipantCard;
