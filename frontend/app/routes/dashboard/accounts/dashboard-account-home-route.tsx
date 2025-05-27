import AccountCard from "@/app/components/shared/account-cards";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function AccountHomeRoute() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchAccounts = async () => {
      const response = await fetch('http://localhost:5000/api/v1/accounts',{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setAccounts(data);
      setLoading(false);
    };
    fetchAccounts();
  })
  return (
    <div>
      <p className="text-3xl font-bold"> Essas sao suas Contas !</p>
      <p>Aqui você pode gerenciar suas informações e configurações.</p>
      <div className="flex flex-wrap gap-6">
        {accounts.map((account:any) => {
          return (
            <AccountCard
            loading={loading}
              key={account.id}
              iban={account.id}
              accountName={account.bank}
              linkedCards={account.cards.length}
              balance={account.balance}
              onClick={() => navigate(`/dashboard/contas/${account.id}`)}
            />
          );
        })}
      </div>
    </div>
  );
}
