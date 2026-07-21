import { BESTIARY_MOCK } from '../data/mockMonsters';
import type { MonsterTemplate } from '../types';

const fakeDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
export const monsterApi = {
  getAllMonsters: async (): Promise<MonsterTemplate[]> => {
    await fakeDelay(300);
    return BESTIARY_MOCK;
  },
  getMonsterById: async (id: string): Promise<MonsterTemplate | null> => {
    await fakeDelay(300);
    const monster = BESTIARY_MOCK.find((m) => m.id === id);
    return monster || null;
  },
};
