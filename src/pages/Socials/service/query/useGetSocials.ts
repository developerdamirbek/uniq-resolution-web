import { useQuery } from '@tanstack/react-query';
import request from '../../../../config/requests';

export const useGetSocials = () => {
  return useQuery({
    queryKey: ['socials'],
    queryFn: () => request.get('/social').then((res) => res.data),
  });
};
