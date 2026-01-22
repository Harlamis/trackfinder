import "../index.css";
import { Button } from "./Button";
import ConditionBadge from "./ConditionBadge";
import ParticipantCard from "./ParticipantCard";
import { type IParticipant } from "./ParticipantCard";

const participants: IParticipant[] = [
  {
    base_id: 1,
    name: "John",
    current_health: 45,
    max_health: 45,
    armor_class: 19,
    initiative: 18,
  },
  {
    base_id: 2,
    name: "Joe",
    current_health: 15,
    max_health: 23,
    armor_class: 14,
    initiative: 20,
  },
];

export function EncounterTable() {
  return (
    <div className="flex flex-col h-fit w-5xl">
      {participants
        .toSorted((a, b) => b.initiative - a.initiative)
        .map((participant) => (
          <ParticipantCard key={participant.base_id} {...participant} />
        ))}
    </div>
  );
}
