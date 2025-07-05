import { useMutation } from '@tanstack/react-query';
import request from '../../../../config/requests';

// data da type berib ketish kerak
type DataType = {
  name: string;
  description: string;
  link: string;
  skills: [];
};

export const useCreateProjects = () => {
  return useMutation({
    mutationKey: ['create-projects'],
    mutationFn: (data: DataType) => request.post('/projects', data).then((res) => res.data),
  });
};
