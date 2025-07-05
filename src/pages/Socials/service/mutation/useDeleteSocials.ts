import { useMutation } from '@tanstack/react-query';
import request from '../../../../config/requests';

export const useDeleteSocials = () => {
  return useMutation({
    mutationKey: ['delete-socail'],
    mutationFn: (id: number) => request.delete(`/social/${id}`).then((res) => res.data),
  });
};
