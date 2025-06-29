import type { SweetAlertIcon, SweetAlertPosition } from "sweetalert2";

export interface ToastOptions {
  title?: string;
  text?: string;
  icon?: SweetAlertIcon;
  position?: SweetAlertPosition;
  timer?: number;
  showConfirmButton?: boolean;
  toast?: boolean;
  background?: string;
  customClass?: {
    popup?: string;
    title?: string;
    htmlContainer?: string;
  };
  didOpen?: (toast: HTMLElement) => void;
  willClose?: (toast: HTMLElement) => void;
}