import { create } from 'zustand';
import Cookies from 'js-cookie';

interface UserDetails {
  id: number;
  name: string | null;
  surname: string | null;
  img_path: string | null;
  email: string;
  phone_number: string | null;
  about: string | null;
}


interface AuthState {
  isAuthenticated: boolean;
  userDetails: UserDetails | null;
  login: (data: {
    access_token: string;
    id: number;
    name: string | null;
    surname: string | null;
    img_path: string | null;
    email: string;
    phone_number: string | null;
    about: string | null;
  }) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  userDetails: null,

  login: (data) => {
    Cookies.set('accessToken', data.access_token, { expires: 1 });

    set({
      isAuthenticated: true,
      userDetails: {
        id: data.id,
        name: data.name,
        surname: data.surname,
        img_path: data.img_path,
        email: data.email,
        phone_number: data.phone_number,
        about: data.about,
      },
    });
  },

  logout: () => {
    Cookies.remove('accessToken');
    set({
      isAuthenticated: false,
      userDetails: null,
    });
  },

  checkAuth: () => {
    const accessToken = Cookies.get('accessToken');

    set({
      isAuthenticated: Boolean(accessToken),
      userDetails: accessToken ? get().userDetails : null,
    });
  },
}));
