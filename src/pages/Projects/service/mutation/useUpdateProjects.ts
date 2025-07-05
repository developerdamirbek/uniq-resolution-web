import { useMutation } from '@tanstack/react-query';
import request from '../../../../config/requests';

// data da type berib ketish kerak
type DataType = {
  id: number;
  name: string;
  description: string;
  link: string;
  skills: [];
};

export const useUpdataProjects = () => {
  return useMutation({
    mutationKey: ['update-projects'],
    mutationFn: (data: DataType) =>
      request.patch(`/projects/${data.id}`, data).then((res) => res.data),
  });
};
