import Swal from 'sweetalert2';
import type { ToastOptions } from '../types/utils';

const defaultOptions: ToastOptions = {
  title: 'Notification',
  icon: 'success',
  position: 'top-end',
  timer: 2000,
  showConfirmButton: false,
  toast: true,
};

export const toast = (options: ToastOptions = {}): void => {
  const config: ToastOptions = {
    ...defaultOptions,
    ...options,
  };

  Swal.fire(config);
};
