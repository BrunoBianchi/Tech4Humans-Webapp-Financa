import { useAuth } from "@/app/contexts/auth-context";
import { Navigate, Outlet } from "react-router";
import SideBarComponent from "@/app/components/ui/sidebar-component";
import { AccountProvider } from "../contexts/account-context";
import { CategoryProvider } from "@/app/contexts/select-context";
import ChatPopup from "../components/chat-component";

export default function DashboardLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <div className="flex pt-16">
        <SideBarComponent />
      
        <main className="flex-2  p-6">
          <AccountProvider>
            <CategoryProvider>
                <ChatPopup></ChatPopup>
              <Outlet />
            </CategoryProvider>
          </AccountProvider>
        </main>
      </div>
    </div>
  );
}
