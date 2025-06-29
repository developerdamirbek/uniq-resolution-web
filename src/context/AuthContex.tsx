import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

interface LoginData {
  access_token: string;
  id: number;
  name: string | null;
  surname: string | null;
  img_path: string | null;
  email: string;
  phone_number: string | null;
  about: string | null;
}
  
interface AuthContextType {
  isAuthenticated: boolean;
  login: (data: LoginData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, login, logout, checkAuth } = useAuthStore();
  const [initialAuthCheckDone, setInitialAuthCheckDone] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const verifyAuth = () => {
      try {
        checkAuth();
      } catch (error) {
        console.error(error);
        navigate("/auth", { replace: true });
      }
      setInitialAuthCheckDone(true);
    };

    verifyAuth();
  }, [navigate, checkAuth]);

  const contextValue: AuthContextType = {
    isAuthenticated,
    login,
    logout,
  };

  if (!initialAuthCheckDone) {
    return null;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
