import { CardProvider } from "@/app/contexts/card-context/card-context";
import { Outlet } from "react-router";

export default function AccountLayout() {
  return (
    <CardProvider>
      <Outlet />
    </CardProvider>
  );
}
