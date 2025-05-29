import { CardProvider } from "@/app/contexts/card-context/card-context";
import { ContactProvider } from "@/app/contexts/contact-context/contact-context";
import { TransactionProvider } from "@/app/contexts/transaction-context/transaction-context";
import { Outlet } from "react-router";

export default function AccountLayout() {
  return (
    <CardProvider>
      <TransactionProvider>
        <ContactProvider>
          <Outlet />
        </ContactProvider>
      </TransactionProvider>
    </CardProvider>
  );
}
