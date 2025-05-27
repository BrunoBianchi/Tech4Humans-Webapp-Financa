import SmartAdviceCard from "@/app/components/shared/advice-ai-card";
import { useAuth } from "@/app/contexts/auth/auth-context";

export default function HomeRoute() {
    const {user,loading} = useAuth();
  return (
    <div>
      <p className="text-3xl font-bold">Ola, {user?.name} 👋</p>
      <p>Aqui está uma pequena revisão de como está o seu dinheiro.</p>
      <SmartAdviceCard></SmartAdviceCard>
    </div>
  );
}