import { useMutation } from '@tanstack/react-query';
import request from '../../../../config/requests';

// data da type berib ketish kerak
type DataType = {
  name: string;
  link: string;
};

export const useCreateSocials = () => {
  return useMutation({
    mutationKey: ['create-socail'],
    mutationFn: (data: DataType) => request.post('/social', data).then((res) => res.data),
  });
};
