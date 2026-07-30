export interface MonsterTemplate {
  id: string;
  baseName: string;
  maxHp: number;
  ac: number;
  details?: MonsterDetails;
}

export interface ActiveMonsterView {
  id: number;
  encounterId: number;
  templateId: string;
  customName?: string;
  name?: string;
  maxHp: number;
  currentHp: number;
  ac: number;
  init: number;
  isPlayer: boolean;
  baseName: string;
  details?: MonsterDetails;
}

export type SidebarMonsterMetadata = Pick<MonsterTemplate, 'id' | 'baseName'>;

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
    burrowing: number;
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

export interface EncounterDto {
  id: number;
  name: string;
  currentRound: number;
  activeMonsterId: number | null;
  monsters: ActiveMonsterDto[];
}

export interface CreateEncounterDto {
  name: string;
}

export interface UpdateEncounterDto {
  id: number;
  name?: string;
  activeMonsterId?: number | null;
  currentRound?: number;
}

export interface ActiveMonsterDto {
  id: number;
  encounterId: number;
  templateId: string;
  name?: string;
  customName?: string;
  maxHp: number;
  currentHp: number;
  ac: number;
  init: number | null;
  isPlayer?: boolean;
}

export interface AddMonsterToEncounterDto {
  encounterId: number;
  templateId: string;
}

export interface UpdateMonsterDto {
  id: number;
  currentHp?: number;
  maxHp?: number;
  init?: number;
  ac?: number;
  isPlayer?: boolean;
  customName?: string;
}

export interface MonsterTemplateDto {
  id: string;
  baseName: string;
  maxHp: number;
  ac: number;
  detailsJson: string;
}
