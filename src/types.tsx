export interface Encounter {
  id: number;
  name: string;
  currentRound: number;
}

export interface SidebarMonsterMetadata extends Omit<Monster, 'maxHp' | 'currentHp' | 'ac' | 'init'>


export interface Monster {
  id: number;
  name: string;
  maxHp: number;
  currentHp?: number;
  ac: number;
  init?: number;
  isPlayer?: boolean;
}
