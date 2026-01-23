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
    conditions: [
      {
        type: "Dazed",
        value: 1,
      },
    ],
  },
  {
    base_id: 2,
    name: "Joe",
    current_health: 15,
    max_health: 23,
    armor_class: 14,
    initiative: 20,
    conditions: [
      {
        type: "Stunned",
        value: 2,
      },
      {
        type: "Dying",
        value: 3,
      },
    ],
  },
];

export function EncounterTable() {
  return (
    <div className="flex flex-col gap-1.5 h-fit w-5xl bg-surface p-4">
      {participants
        .toSorted((a, b) => b.initiative - a.initiative)
        .map((participant) => (
          <ParticipantCard key={participant.base_id} {...participant} />
        ))}
    </div>
  );
}
