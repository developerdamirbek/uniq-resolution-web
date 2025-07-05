import { useQuery } from '@tanstack/react-query';
import request from '../../../../config/requests';

export const useGetProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => request.get('/projects').then((res) => res.data),
  });
};
