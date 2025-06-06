import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useCookies } from "react-cookie";
import { accountService } from "@/app/services/account-service";
import type { Account } from "@/app/types/account-type";
import { useToast } from "./toast-context";
type AccountContextType = {
  accounts: Account[];
  addAccount: (account: Account) => void;
  removeAccount: (id: string) => void;
  loading: boolean;
  getAccountById: (id: string) => Account | null;
};

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const { addToast } = useToast();

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(["token"]);
  useEffect(() => {
    checkAccountStatus();
  }, []);

  const addAccount = (account: Account) => {
    accountService
      .create(account, cookies.token)
      .then((acc) => {
        setAccounts((prev) => [...prev, acc]);
      })
      .then(() => {
        addToast("Conta adicionada com sucesso!", "success");
      })
      .catch((error) => {
        addToast(error.message, "error");
      });
  };

  const removeAccount = (id: string) => {
    accountService
      .delete(id, cookies.token)
      .then((acc) => {
        setAccounts((prev) => prev.filter((acc) => acc.id !== id));
      })
      .then(() => {
        addToast("Conta removida com sucesso!", "success");
      })
      .catch((error) => {
        addToast(error.message, "error");
      });
  };

  const checkAccountStatus = async () => {
    setLoading(true);
    const token = cookies.token;

    const data = await accountService.getAll(token);
    setAccounts(data);
    setLoading(false);
  };

  const getAccountById = (id: string) => {
    return accounts.find((account) => account.id === id) || null;
  };

  return (
    <AccountContext.Provider
      value={{ accounts, addAccount, removeAccount, loading, getAccountById }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccountContext = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccountContext must be used within an AccountProvider");
  }
  return context;
};
