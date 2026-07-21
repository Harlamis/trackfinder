import type { ActiveMonster, CombatMonster, MonsterTemplate } from './types';

export interface BestiaryFilters {
  query?: string;
  minLvl?: number;
  maxLvl?: number;
}

export const BestiaryService = {
  hydrateMonsters: (
    combatmonsters: CombatMonster[],
    templates: MonsterTemplate[]
  ): ActiveMonster[] => {
    const templateMap = new Map(templates.map((t) => [t.id, t]));
    return combatmonsters.map((cm) => {
      const template = templateMap.get(cm.templateId);
      if (!template)
        return {
          id: cm.id,
          templateId: cm.templateId,
          baseName: 'Unknown Monster',
          customName: cm.customName,
          currentHp: cm.currentHp,
          maxHp: cm.currentHp,
          ac: 10,
          init: cm.init,
          isPlayer: cm.isPlayer ?? false,
        } as ActiveMonster;
      return { ...template, ...cm } as ActiveMonster;
    });
  },

  filterBestiary: (
    templates: MonsterTemplate[],
    filters: BestiaryFilters = {}
  ): MonsterTemplate[] => {
    const query = filters.query?.trim().toLowerCase() || '';
    return templates.filter((t) => {
      const matchesQuery =
        query === '' || t.baseName.toLowerCase().includes(query);
      const level = t.details?.level;
      const matchesMinLvl =
        filters.minLvl == null ||
        (typeof level === 'number' && level >= filters.minLvl);
      const matchesMaxLvl =
        filters.maxLvl == null ||
        (typeof level === 'number' && level <= filters.maxLvl);
      return matchesQuery && matchesMinLvl && matchesMaxLvl;
    });
  },

};
