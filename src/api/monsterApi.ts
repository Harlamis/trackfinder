import type {
  ActiveMonsterDto,
  AddMonsterToEncounterDto,
  MonsterTemplateDto,
  UpdateMonsterDto,
} from '../types';
import api from './axiosConfig';

export const monsterApi = {
  getAllTemplates: async (): Promise<MonsterTemplateDto[]> => {
    const response = await api.get('/v1/templates');
    return response.data;
  },
  addMonsterToEncounter: async (
    dto: AddMonsterToEncounterDto
  ): Promise<ActiveMonsterDto> => {
    const response = await api.post('/v1/encounters/monsters', dto);
    return response.data;
  },
  updateMonster: async (dto: UpdateMonsterDto): Promise<void> => {
    await api.patch('/v1/encounters/monsters', dto);
  },
  deleteMonster: async (id: number): Promise<void> => {
    await api.delete(`/v1/encounters/monsters/${id}`);
  },
};
