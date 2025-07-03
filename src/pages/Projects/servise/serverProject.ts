import { instance } from '../../../api/instans';

export const ServerProject = {
  get: async () => {
    const responce = await instance('/projects');
    return responce;
  },
};
