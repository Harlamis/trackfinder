import type { CombatMonster, Encounter, MonsterTemplate } from './types';

export const encounterService = {
  createEncounter: (name: string): Encounter => {
    return {
      id: Date.now(),
      name: name.trim() || 'Нова сутичка',
      monsters: [],
      activeMonsterId: null,
      currentRound: 1,
    };
  },

  addMonster: (encounter: Encounter, template: MonsterTemplate): Encounter => {
    const newMonster: CombatMonster = {
      templateId: template.id,
      customName: undefined,
      currentHp: template.maxHp,
      init: 0,
      maxHp: template.maxHp,
      isPlayer: false,
      id: Date.now() + Math.floor(Math.random() * 1000),
    };

    return {
      ...encounter,
      monsters: [...encounter.monsters, newMonster],
    };
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

  updateMonster: (
    monsters: CombatMonster[],
    monsterId: number,
    changes: Partial<CombatMonster>
  ): CombatMonster[] => {
    const validated: Partial<CombatMonster> = { ...changes };

    if (
      'init' in validated &&
      validated.init !== undefined &&
      Number.isNaN(validated.init)
    ) {
      delete validated.init;
    }
    if (
      'ac' in validated &&
      validated.ac !== undefined &&
      Number.isNaN(validated.ac)
    ) {
      delete validated.ac;
    }
    if ('maxHp' in validated && validated.maxHp !== undefined) {
      if (Number.isNaN(validated.maxHp) || validated.maxHp < 0) {
        delete validated.maxHp;
      }
    }
    if ('customName' in validated && validated.customName !== undefined) {
      const trimmed = validated.customName.trim();
      validated.customName = trimmed === '' ? undefined : trimmed;
    }

    return monsters.map((mon) => {
      if (mon.id !== monsterId) return mon;

      const updated = { ...mon, ...validated };

      if ('maxHp' in validated && updated.maxHp !== undefined) {
        updated.currentHp = Math.min(updated.currentHp, updated.maxHp);
      }

      return updated;
    });
  },

  applyHpDelta: (
    monsters: CombatMonster[],
    monsterId: number,
    deltaHp: number
  ): CombatMonster[] => {
    if (Number.isNaN(deltaHp)) return monsters;

    return monsters.map((mon) => {
      if (mon.id !== monsterId) return mon;

      const newHp = Math.max(0, Math.min(mon.maxHp, mon.currentHp + deltaHp));
      return { ...mon, currentHp: newHp };
    });
  },

  removeMonster: (
    monsters: CombatMonster[],
    monsterId: number
  ): CombatMonster[] => {
    return monsters.filter((mon) => mon.id !== monsterId);
  },
};
