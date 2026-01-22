interface IParticipant {
  base_id: number;
  name: string;
  health: number;
  armor_class: number;
  initiative: number;
}

const participants: IParticipant[] = [
  { base_id: 1, name: "John", health: 45, armor_class: 19, initiative: 18 },
  { base_id: 2, name: "Joe", health: 23, armor_class: 14, initiative: 20 },
];

const ParticipantCard = ({
  base_id,
  name,
  health,
  armor_class,
  initiative,
}: IParticipant) => {
  return (
    <div className="flex justify-between w-full">
      <span className="text-accent">{initiative}</span>
      <span className="text-text-secondary">{armor_class}</span>
      <span className="text-status-warning">{health}</span>
    </div>
  );
};

export default ParticipantCard;
