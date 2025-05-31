import { CardProvider } from "@/app/contexts/card-context";
import { ContactProvider } from "@/app/contexts/contact-context";
import { CategoryProvider } from "@/app/contexts/select-context";
import { TransactionProvider } from "@/app/contexts/transaction-context";
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
