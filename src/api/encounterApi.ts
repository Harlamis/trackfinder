import type {
  CreateEncounterDto,
  EncounterDto,
  UpdateEncounterDto,
} from '../types';
import api from './axiosConfig';

export const encounterApi = {
  getAll: async (): Promise<EncounterDto[]> => {
    const response = await api.get('/v1/encounters');
    return response.data;
  },
  getById: async (id: number): Promise<EncounterDto> => {
    const response = await api.get(`/v1/encounters/${id}`);
    return response.data;
  },
  create: async (dto: CreateEncounterDto): Promise<number> => {
    const response = await api.post('/v1/encounters', dto);
    return response.data;
  },
  update: async (dto: UpdateEncounterDto): Promise<void> => {
    await api.patch('/v1/encounters', dto);
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/v1/encounters/${id}`);
  },
};
