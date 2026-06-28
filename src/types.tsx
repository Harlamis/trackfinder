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
  details?: MonsterDetails;
}
export type SidebarMonsterMetadata = Omit<
  Monster,
  'maxHp' | 'currentHp' | 'ac' | 'init' | 'isPlayer'
>;

export interface Strike {
  name: string;
  type: 'melee' | 'ranged';
  bonus: number;
  traits: string[];
}

export interface Loot {
  name: string;
  quantity: number;
  value?: number;
}

export interface MonsterDetails {
  level: number;
  traits: string[];
  speed: {
    walking: number;
    flying: number;
    swimming: number;
    borrrowing: number;
    climbing: number;
  };
  savingThrows: {
    fortitude: number;
    reflex: number;
    will: number;
  };

  attacks: Strike[];
  loot: Loot[];
}

export type PanelMode = 'closed' | 'bestiary' | 'inspector';
