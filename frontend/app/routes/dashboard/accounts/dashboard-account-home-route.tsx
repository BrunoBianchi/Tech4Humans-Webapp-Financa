import AccountCard from "@/app/components/shared/account-cards";

export default function AccountHomeRoute() {
  return (
    <div>
      <p className="text-3xl font-bold">Olá, bem-vindo à sua conta!</p>
      <p>Aqui você pode gerenciar suas informações e configurações.</p>
      <div className="flex flex-wrap gap-6">    <AccountCard></AccountCard>    <AccountCard></AccountCard>    <AccountCard></AccountCard></div>
    </div>
  );
}