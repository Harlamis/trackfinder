import type { Encounter } from '../types';

export const ENCOUNTERS_MOCK: Encounter[] = [
  {
    id: 1,
    name: 'Засідка в руїнах',
    currentRound: 1,
    activeMonsterId: 102,
    monsters: [
      {
        id: 101,
        templateId: 'tpl_player_hero',
        customName: 'Валеріон (Паладин)',
        maxHp: 22,
        currentHp: 22,
        init: 21,
        isPlayer: true,
      },
      {
        id: 102,
        templateId: 'tpl_goblin_warrior',
        customName: 'Гоблін-Снайпер',
        maxHp: 16,
        currentHp: 16,
        init: 18,
        isPlayer: false,
      },
      {
        id: 103,
        templateId: 'tpl_goblin_warrior',
        customName: 'Гоблін-Ватажок',
        maxHp: 18,
        currentHp: 7,
        init: 14,
        isPlayer: false,
      },
      {
        id: 104,
        templateId: 'tpl_skeleton_guard',
        maxHp: 4,
        currentHp: 0,
        init: 9,
        isPlayer: false,
      },
    ],
  },
];
