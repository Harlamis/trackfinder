interface HealthbarProps {
  currentHp: number;
  maxHp: number;
  isPlayer: boolean;
}

export const Healthbar = ({ currentHp, maxHp, isPlayer }: HealthbarProps) => {
  const percentage = (currentHp / maxHp) * 100;
  return (
    <div
      className={`relative h-10 rounded-full ${isPlayer ? 'bg-success/50' : 'bg-danger/35'}`}
    >
      <div
        className={`h-full rounded-full ${isPlayer ? 'bg-success' : 'bg-danger'}`}
        style={{ width: `${percentage}%` }}
      ></div>
      <span className='absolute inset-0 flex items-center justify-center text-text-main'>
        {currentHp}/{maxHp}
      </span>
    </div>
  );
};
