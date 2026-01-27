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
    <div className="flex flex-col gap-3 h-fit lg:w-5xl w-full bg-surface p-3 sm:p-4 overflow-x-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <h2 className="text-text-primary text-lg sm:text-2xl font-bold truncate">
          Encounter
        </h2>

        <div className="flex gap-1.5">
          <Button className="text-[10px] sm:text-xs px-2 py-1 h-8">
            Next Turn
          </Button>
          <Button className="text-[10px] sm:text-xs px-2 py-1 h-8">
            Add Creature
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {participants
          .toSorted((a, b) => b.initiative - a.initiative)
          .map((participant) => (
            <ParticipantCard key={participant.base_id} {...participant} />
          ))}
      </div>
    </div>
  );
}
