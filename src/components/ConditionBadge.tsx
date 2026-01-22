type ConditionType = "Dazed" | "Stunned" | "Blinded" | "Dying";

interface ConditionInfo {
  color: string;
  applyEffect?: () => void; //IParticipant will be here instead of "any"
}

interface ICondition {
  type: ConditionType;
  value?: number;
}

const ConditionMetadata: Record<ConditionType, ConditionInfo> = {
  Stunned: {
    color: "bg-condition-stunned",
    applyEffect: () => console.log("'Stunned' condition action placeholder"),
  },
  Blinded: {
    color: "bg-condition-stunned",
    applyEffect: () => console.log("'Blinded' condition action placeholder"),
  },
  Dazed: {
    color: "bg-condition-dazed",
    applyEffect: () => console.log("'Dazed' condition action placeholder"),
  },
  Dying: {
    color: "bg-condition-dying",
    applyEffect: () => console.log("'Dying' condition action placeholder"),
  },
};

export default function ConditionBadge({ type, value }: ICondition) {
  const meta = ConditionMetadata[type];
  const innerContent = value ? `${type} ${value}` : type;
  return (
    <span className={`${meta.color} rounded-2xl text-text-primary-dark`}>
      {innerContent}
    </span>
  );
}
