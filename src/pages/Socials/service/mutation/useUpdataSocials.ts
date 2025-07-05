import { useMutation } from '@tanstack/react-query';
import request from '../../../../config/requests';

// data da type berib ketish kerak
type DataType = {
  id: number;
  name: string;
  link: string;
};

export const useUpdataSocials = () => {
  return useMutation({
    mutationKey: ['update-socail'],
    mutationFn: (data: DataType) =>
      request.patch(`/social/${data.id}`, data).then((res) => res.data),
  });
};
