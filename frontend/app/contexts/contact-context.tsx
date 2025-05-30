import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useCookies } from "react-cookie";
import { type Contact } from "@/app/types/contact-type";
import { ContactService } from "@/app/services/contact-service";
import { useParams } from "react-router";
import { useToast } from "./toast-context";

type ContactContextType = {
  contacts: Contact[];
  addContact: (Contact: Contact) => void;
  loading: boolean;
  getContactById: (id: string) => Contact | null;
};

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const ContactProvider = ({ children }: { children: ReactNode }) => {
  const { addToast } = useToast();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(["token"]);
  const params = useParams<{ id: string }>();
  useEffect(() => {
    checkContactStatus();
  }, []);

  const addContact = (Contact: Contact) => {
    ContactService.create(Contact, cookies.token, params.id || "")
      .then((Contact: Contact) => {
        setContacts((prev) => [...prev, Contact]);
      })
      .catch((error) => {
        addToast(error.message, "error");
      })
      .then(() => {
        addToast("Contato criado com sucesso!", "success");
      });
  };

  const checkContactStatus = async () => {
    setLoading(true);
    const token = cookies.token;

    const data = await ContactService.getAll(token, params.id || "");
    setContacts(data);
    setLoading(false);
  };

  const getContactById = (id: string) => {
    setLoading(true);
    return contacts.find((Contact: Contact) => Contact.id === id) || null;
  };

  return (
    <ContactContext.Provider
      value={{ contacts, addContact, loading, getContactById }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContactContext = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContactContext must be used within an ContactProvider");
  }
  return context;
};
