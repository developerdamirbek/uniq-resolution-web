import type { SweetAlertIcon, SweetAlertPosition } from "sweetalert2";

export type LoadingProps = {
  fullScreen?: boolean
  color?: string
  text?: string
}



export type ToastOptions = {
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

export type RoutesType = {
    id: number;
    path?: string;
    name: string;
    component: React.FC;
}

export type CompanyStatus = "Active" | "Inactive" | "Pending" | "Suspended" | "Closed";

export interface Company {
  id: string
  name: string
  inn: string
  status: CompanyStatus
  created_at: string
  updated_at?: string
}

export interface FilterState {
  name: string;
  status: string;
  dateRange: [string, string] | null;
}

export interface SortState {
  field: string;
  order: 'ascend' | 'descend' | null;
}