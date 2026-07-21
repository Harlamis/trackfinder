import type { MonsterTemplate } from "../types";

export const BESTIARY_MOCK: MonsterTemplate[] = [
  {
    id: 'tpl_goblin_warrior',
    baseName: 'Goblin Warrior',
    maxHp: 16,
    ac: 16,
    details: {
      level: -1,
      traits: ['Humanoid', 'Goblin'],
      speed: {
        walking: 30,
        flying: 0,
        swimming: 0,
        borrrowing: 0,
        climbing: 0,
      },
      savingThrows: { fortitude: 5, reflex: 7, will: 3 },
      attacks: [
        {
          name: 'Dogslicer',
          type: 'melee',
          bonus: 8,
          traits: ['agile', 'backstabber', 'finesse', 'goblin'],
        },
        {
          name: 'Shortbow',
          type: 'ranged',
          bonus: 8,
          traits: ['deadly d10', 'goblin'],
        },
      ],
      loot: [
        { name: 'Dogslicer', quantity: 1, value: 1 },
        { name: 'Leather Armor', quantity: 1, value: 2 },
      ],
    },
  },
  {
    id: 'tpl_skeleton_guard',
    baseName: 'Skeleton Guard',
    maxHp: 4,
    ac: 16,
    details: {
      level: -1,
      traits: ['Mindless', 'Skeleton', 'Undead'],
      speed: {
        walking: 25,
        flying: 0,
        swimming: 0,
        borrrowing: 0,
        climbing: 0,
      },
      savingThrows: { fortitude: 2, reflex: 7, will: 4 },
      attacks: [
        {
          name: 'Scimitar',
          type: 'melee',
          bonus: 6,
          traits: ['forceful', 'sweep'],
        },
        { name: 'Claw', type: 'melee', bonus: 6, traits: ['agile', 'finesse'] },
      ],
      loot: [
        { name: 'Scimitar', quantity: 1, value: 1 },
        { name: 'Rusty Shield', quantity: 1 },
      ],
    },
  },
  {
    id: 'tpl_player_hero',
    baseName: 'Player Character',
    maxHp: 10,
    ac: 10,
    details: {
      level: 1,
      traits: ['Humanoid'],
      speed: {
        walking: 25,
        flying: 0,
        swimming: 0,
        borrrowing: 0,
        climbing: 0,
      },
      savingThrows: { fortitude: 0, reflex: 0, will: 0 },
      attacks: [],
      loot: [],
    },
  },
];