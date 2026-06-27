export interface Encounter {
  id: number;
  name: string;
  currentRound: number;
  activeMonsterId: number | null;
  monsters: Monster[];
}

export interface Monster {
  id: number;
  name: string;
  maxHp: number;
  currentHp: number;
  ac: number;
  init: number;
  isPlayer: boolean;
}
export type SidebarMonsterMetadata = Omit<
  Monster,
  'maxHp' | 'currentHp' | 'ac' | 'init' | 'isPlayer'
>;
