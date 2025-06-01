import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import { useCookies } from "react-cookie";
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  loading: boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = cookies.token;
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/user/@me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        removeCookie("token");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      removeCookie("token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }
    const data = await response.json();
    const hours = parseInt(data.expiration.split("h")[0], 10) || 7;
    setCookie("token", data.authorization, {
      path: "/",
      expires: new Date(Date.now() + hours * 60 * 60 * hours * 1000),
      secure: false,
      sameSite: "lax",
    });
    setUser(data.user);
  };

  const signUp = async (email: string, password: string, name: string) => {
    const response = await fetch("http://localhost:5000/user/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    }).then((res) => res.json());

    if (response.message) {
      throw new Error(response.message);
    }
    const data = response;
    const hours = parseInt(data.expiration.split("h")[0], 10) || 7;
    setCookie("token", data.authorization, {
      path: "/",
      expires: new Date(Date.now() + hours * 60 * 60 * hours * 1000),
      secure: false,
      sameSite: "lax",
    });
    setUser(data.user);
  };

  const logout = () => {
    removeCookie("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signUp, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
