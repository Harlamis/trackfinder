import { encounterApi } from './api/encounterApi';
import { monsterApi } from './api/monsterApi';
import type {
  ActiveMonsterDto,
  Encounter,
  EncounterDto,
  UpdateMonsterDto,
} from './types';

export const encounterService = {
  createEncounter: async (name: string): Promise<EncounterDto> => {
    const encId = await encounterApi.create({ name });
    return {
      id: encId,
      name: name.trim() || `Encounter ${encId}`,
      currentRound: 1,
      activeMonsterId: null,
      monsters: [],
    };
  },

  addMonster: async (
    encounterId: number,
    templateId: string
  ): Promise<ActiveMonsterDto> => {
    const newMonster = await monsterApi.addMonsterToEncounter({
      encounterId,
      templateId,
    });
    return newMonster;
  },

  nextTurn: (encounter: Encounter): Encounter => {
    if (encounter.monsters.length === 0) {
      return { ...encounter, activeMonsterId: null };
    }

    const sorted = [...encounter.monsters].sort((a, b) => b.init - a.init);
    const currentIndex = sorted.findIndex(
      (m) => m.id === encounter.activeMonsterId
    );

    let nextIndex: number;
    let newRound = encounter.currentRound || 1;

    if (currentIndex === -1 || currentIndex === sorted.length - 1) {
      nextIndex = 0;
      if (currentIndex !== -1) {
        newRound += 1;
      }
    } else {
      nextIndex = currentIndex + 1;
    }

    return {
      ...encounter,
      activeMonsterId: sorted[nextIndex].id,
      currentRound: newRound,
    };
  },

  previousTurn: (encounter: Encounter): Encounter => {
    if (encounter.monsters.length === 0) {
      return { ...encounter, activeMonsterId: null };
    }

    const sorted = [...encounter.monsters].sort((a, b) => b.init - a.init);
    const currentIndex = sorted.findIndex(
      (m) => m.id === encounter.activeMonsterId
    );

    let prevIndex: number;
    let newRound = encounter.currentRound || 1;

    if (currentIndex <= 0) {
      prevIndex = sorted.length - 1;
      newRound = Math.max(1, newRound - 1);
    } else {
      prevIndex = currentIndex - 1;
    }

    return {
      ...encounter,
      activeMonsterId: sorted[prevIndex].id,
      currentRound: newRound,
    };
  },

  resetEncounter: (encounter: Encounter): Encounter => {
    const sorted = [...encounter.monsters].sort((a, b) => b.init - a.init);
    return {
      ...encounter,
      currentRound: 1,
      activeMonsterId: sorted.length > 0 ? sorted[0].id : null,
    };
  },

  updateMonster: async (
    monsters: ActiveMonsterDto[],
    monsterId: number,
    changes: Partial<ActiveMonsterDto>
  ): Promise<ActiveMonsterDto[]> => {
    const validated: Partial<UpdateMonsterDto> = {};

    if (
      'init' in changes &&
      changes.init !== undefined &&
      changes.init !== null &&
      !Number.isNaN(changes.init)
    ) {
      validated.init = changes.init;
    }

    if (
      'ac' in changes &&
      changes.ac !== undefined &&
      changes.ac !== null &&
      !Number.isNaN(changes.ac)
    ) {
      validated.ac = changes.ac;
    }

    if (
      'maxHp' in changes &&
      changes.maxHp !== undefined &&
      changes.maxHp !== null &&
      !Number.isNaN(changes.maxHp) &&
      changes.maxHp >= 0
    ) {
      validated.maxHp = changes.maxHp;
    }

    if (
      'currentHp' in changes &&
      changes.currentHp !== undefined &&
      changes.currentHp !== null &&
      !Number.isNaN(changes.currentHp)
    ) {
      validated.currentHp = changes.currentHp;
    }

    if ('customName' in changes && typeof changes.customName === 'string') {
      const trimmed = changes.customName.trim();
      validated.customName = trimmed === '' ? undefined : trimmed;
    }

    if ('isPlayer' in changes && typeof changes.isPlayer === 'boolean') {
      validated.isPlayer = changes.isPlayer;
    }

    if (Object.keys(validated).length === 0) {
      return monsters;
    }

    await monsterApi.updateMonster({ id: monsterId, ...validated });

    return monsters.map((mon) => {
      if (mon.id !== monsterId) return mon;

      const updated = { ...mon, ...validated };

      if (validated.maxHp !== undefined) {
        updated.currentHp = Math.min(updated.currentHp, updated.maxHp);
      }

      return updated;
    });
  },

  applyHpDelta: async (
    monsters: ActiveMonsterDto[],
    monsterId: number,
    deltaHp: number
  ): Promise<ActiveMonsterDto[]> => {
    if (Number.isNaN(deltaHp)) return monsters;

    const target = monsters.find((m) => m.id === monsterId);

    if (target) {
      const newHp = Math.max(
        0,
        Math.min(target.maxHp, target.currentHp + deltaHp)
      );

      await monsterApi.updateMonster({ id: monsterId, currentHp: newHp });

      return monsters.map((mon) => {
        if (mon.id !== monsterId) return mon;
        return { ...mon, currentHp: newHp };
      });
    }
    return monsters;
  },

  removeMonster: async (
    monsters: ActiveMonsterDto[],
    monsterId: number
  ): Promise<ActiveMonsterDto[]> => {
    await monsterApi.deleteMonster(monsterId);
    return monsters.filter((mon) => mon.id !== monsterId);
  },
};
