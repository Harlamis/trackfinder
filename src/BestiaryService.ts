import { monsterApi } from './api/monsterApi';
import type { MonsterTemplate, ActiveMonsterDto, ActiveMonster } from './types';

export interface BestiaryFilters {
  query?: string;
  minLvl?: number;
  maxLvl?: number;
}

export const BestiaryService = {
  loadTemplates: async (): Promise<MonsterTemplate[]> => {
    const dtos = await monsterApi.getAllTemplates();
    const templates = dtos.map((dto) => {
      let parsedDetails = undefined;
      if (dto.detailsJson) {
        try {
          parsedDetails = JSON.parse(dto.detailsJson);
        } catch (e) {
          console.error(
            `Could not parse details payload for template id: ${dto.id}`,
            e
          );
        }
      }
      const template: MonsterTemplate = {
        id: dto.id,
        baseName: dto.baseName,
        maxHp: dto.maxHp,
        ac: dto.ac,
        details: parsedDetails,
      };
      return template;
    });
    return templates;
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

  hydrateMonsters: (
    monsters: ActiveMonsterDto[],
    templates: MonsterTemplate[]
  ): ActiveMonster[] => {
    return monsters.map((monster) => {
      const template = templates.find((t) => t.id === monster.templateId);
      return {
        id: monster.id,
        templateId: monster.templateId,
        customName: monster.customName ?? monster.name,
        maxHp: monster.maxHp,
        currentHp: monster.currentHp,
        ac: monster.ac,
        init: monster.init ?? 0,
        isPlayer: monster.isPlayer ?? false,
        baseName: template?.baseName ?? monster.templateId,
        details: template?.details,
      };
    });
  },
};
