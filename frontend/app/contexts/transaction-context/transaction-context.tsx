import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useCookies } from "react-cookie";
import { transactionService } from "@/app/services/transaction-service";
import type { Transaction } from "@/app/types/transaction-type";
import { useParams } from "react-router";
import { useToast } from "../toast-context/toast-context";

type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (
    Transaction: Transaction,
    sourceAccount: string,
    destinationAccount: string,
  ) => void;
  loading: boolean;
  getTransactionById: (id: string) => Transaction | null;
};

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined,
);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const { addToast } = useToast();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(["token"]);
  const params = useParams<{ id: string }>();
  useEffect(() => {
    checkTransactionStatus();
  }, []);

  const addTransaction = (
    Transaction: Transaction,
    sourceAccount: string,
    destinationAccount: string,
  ) => {
    transactionService
      .create(Transaction, cookies.token, sourceAccount, destinationAccount)
      .then((Transaction: Transaction) => {
        setTransactions((prev) => [...prev, Transaction]);
      })
      .catch((error) => {
        addToast(error.message, "error");
      })
      .then(() => {
        addToast("Transacao relizada com sucesso!", "success");
      });
  };

  const checkTransactionStatus = async () => {
    setLoading(true);
    const token = cookies.token;

    const data = await transactionService.getAll(token, params.id || "");
    setTransactions(data);
    setLoading(false);
  };

  const getTransactionById = (id: string) => {
    setLoading(true);
    return (
      transactions.find((Transaction: Transaction) => Transaction.id === id) ||
      null
    );
  };

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, loading, getTransactionById }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactionContext must be used within an TransactionProvider");
  }
  return context;
};
