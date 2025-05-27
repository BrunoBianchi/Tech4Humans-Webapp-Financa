
import SmartAdviceCard from "@/app/components/shared/advice-ai-card";
import { useAuth } from "@/app/contexts/auth/auth-context";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";

export default function HomeRoute() {
  const { user } = useAuth();

  const pieData = [
    { id: 0, value: 5, label: "Cartão de Crédito" },
    { id: 1, value: 3, label: "Conta Corrente" },
    { id: 2, value: 2, label: "Poupança" },
  ];

  const barData = {
    labels: ["Aluguel", "Mercado", "Lazer", "Transporte"],
    values: [1200, 800, 300, 400],
  };

  return (
    <div className="max-w-[80%]  space-y-8">
      <div>
        <p className="text-3xl font-bold">Olá, {user?.name} 👋</p>
        <p className="text-gray-600">
          Aqui está uma pequena revisão de como está o seu dinheiro.
        </p>
      </div>

      <SmartAdviceCard />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráfico de Pizza */}
        <div className="bg-white rounded-xl p-4 shadow-md">
          <h3 className="text-lg font-semibold mb-2">Distribuição de Contas</h3>
          <PieChart series={[{ data: pieData }]} width={300} height={200} />
        </div>

        {/* Gráfico de Barras */}
        <div className="bg-white rounded-xl p-4 shadow-md">
          <h3 className="text-lg font-semibold mb-2">Despesas por Categoria</h3>
          <BarChart
            xAxis={[{ scaleType: "band", data: barData.labels }]}
            series={[{ data: barData.values }]}
            width={300}
            height={200}
          />
        </div>
      </div>
    </div>
  );
}
