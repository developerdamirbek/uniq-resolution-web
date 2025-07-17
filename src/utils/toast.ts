import Swal from 'sweetalert2';

export interface ToastOptions {
  title?: string;
  text?: string;
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question';
  position?: 'top' | 'top-start' | 'top-end' | 'center' | 'center-start' | 'center-end' | 'bottom' | 'bottom-start' | 'bottom-end';
  timer?: number;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  toast?: boolean;
  background?: string;
  color?: string;
  showCloseButton?: boolean;
  allowOutsideClick?: boolean;
  allowEscapeKey?: boolean;
  customClass?: {
    container?: string;
    popup?: string;
    header?: string;
    title?: string;
    closeButton?: string;
    icon?: string;
    image?: string;
    content?: string;
    input?: string;
    actions?: string;
    confirmButton?: string;
    cancelButton?: string;
    footer?: string;
  };
}

const defaultOptions: ToastOptions = {
  title: 'Notification',
  icon: 'success',
  position: 'top',
  timer: 3000,
  showConfirmButton: false,
  toast: true,
  background: '#ffffff',
  color: '#545454',
  showCloseButton: true,
  allowOutsideClick: true,
  allowEscapeKey: true,
  customClass: {
    popup: 'rounded-lg shadow-lg border-0',
    title: 'text-lg font-semibold',
    closeButton: 'text-gray-400 hover:text-gray-600',
  },
};

export const toast = (options: ToastOptions = {}): Promise<any> => {
  const config: ToastOptions = {
    ...defaultOptions,
    ...options,
  };

  const getEnhancedStyles = (icon: string) => {
    const styles = {
      success: {
        // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#222',
        customClass: {
          popup: 'rounded-lg shadow-xl border-0 backdrop-blur-sm',
          title: 'text-lg font-semibold text-white',
          closeButton: 'text-white hover:text-gray-200',
        },
      },
      error: {
        // background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: '#222',
        customClass: {
          popup: 'rounded-lg shadow-xl border-0 backdrop-blur-sm',
          title: 'text-lg font-semibold text-white',
          closeButton: 'text-white hover:text-gray-200',
        },
      },
      warning: {
        // background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        color: '#8b4513',
        customClass: {
          popup: 'rounded-lg shadow-xl border-0 backdrop-blur-sm',
          title: 'text-lg font-semibold text-amber-800',
          closeButton: 'text-amber-800 hover:text-amber-600',
        },
      },
      info: {
        // background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        color: '#1e40af',
        customClass: {
          popup: 'rounded-lg shadow-xl border-0 backdrop-blur-sm',
          title: 'text-lg font-semibold text-blue-800',
          closeButton: 'text-blue-800 hover:text-blue-600',
        },
      },
    };

    return styles[icon as keyof typeof styles] || styles.success;
  };

  if (config.toast && config.icon) {
    const enhancedStyles = getEnhancedStyles(config.icon);
    // config.background = enhancedStyles.background;
    config.color = enhancedStyles.color;
    config.customClass = {
      ...config.customClass,
      ...enhancedStyles.customClass,
    };
  }

  return Swal.fire(config);
};

export const successToast = (title: string, text?: string) =>
  toast({ title, text, icon: 'success' });

export const errorToast = (title: string, text?: string) =>
  toast({ title, text, icon: 'error' });

export const warningToast = (title: string, text?: string) =>
  toast({ title, text, icon: 'warning' });

export const infoToast = (title: string, text?: string) =>
  toast({ title, text, icon: 'info' });

export const confirmDialog = (options: ToastOptions) =>
  toast({
    ...options,
    toast: false,
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: options.confirmButtonText || 'Confirm',
    cancelButtonText: options.cancelButtonText || 'Cancel',
    confirmButtonColor: options.confirmButtonColor || '#3b82f6',
    cancelButtonColor: options.cancelButtonColor || '#6b7280',
    allowOutsideClick: false,
    allowEscapeKey: true,
    customClass: {
      popup: 'rounded-xl shadow-2xl border-0',
      title: 'text-xl font-bold text-gray-900',
      confirmButton: 'rounded-lg px-6 py-2 font-semibold',
      cancelButton: 'rounded-lg px-6 py-2 font-semibold',
    },
  });

export const loadingToast = (title: string = 'Loading...') =>
  Swal.fire({
    title,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
    customClass: {
      popup: 'rounded-lg shadow-lg border-0',
      title: 'text-lg font-semibold text-gray-700',
    },
  });

export const closeLoadingToast = () => Swal.close();