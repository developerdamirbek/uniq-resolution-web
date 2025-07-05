import { useMutation } from '@tanstack/react-query';
import request from '../../../../config/requests';

export const useDeleteProjects = () => {
  return useMutation({
    mutationKey: ['delete-projects'],
    mutationFn: (id: number) => request.delete(`/projects/${id}`).then((res) => res.data),
  });
};
