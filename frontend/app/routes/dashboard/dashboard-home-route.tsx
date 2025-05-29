import { useState } from "react";
import { useAuth } from "@/app/contexts/auth/auth-context";
import { useAccountContext } from "@/app/contexts/account-context/account-context";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import type { Direction } from "@mui/x-charts";
import SmartAdviceCard from "@/app/components/shared/advice-ai-card";
import { useNavigate } from "react-router";
import CreateAccountModal from "@/app/components/shared/modals/create-account-modal";
import { useModal } from "@/app/hooks/modal-controller-hook";
import type { Account } from "@/app/types/account-type";

export default function HomeRoute() {
  const { isOpen, openModal, closeModal } = useModal();
  const { user } = useAuth();
  const { accounts } = useAccountContext();
  const [showAllAccounts, setShowAllAccounts] = useState(false);
  const [search, setSearch] = useState("");

  const filteredAccounts = accounts.filter(
    (a: Account) =>
      a.bank.toLowerCase().includes(search.toLowerCase()) ||
      (a.type && a.type.toLowerCase().includes(search.toLowerCase())) ||
      (a.id && a.id.toString().toLowerCase().includes(search.toLowerCase())),
  );

  const visibleAccounts = showAllAccounts
    ? filteredAccounts
    : filteredAccounts.slice(0, 3);
  const remainingAccountsCount = filteredAccounts.length - 3;

  const navigate = useNavigate();

  const pieData = [
    {
      id: 0,
      value: accounts.filter((a: Account) => a.type === "corrente").length,
      label: "Corrente",
      color: "#453ee3",
    },
    {
      id: 1,
      value: accounts.filter((a: Account) => a.type === "poupanca").length,
      label: "Poupança",
      color: "#fbbf24",
    },
  ];

  const incomingTransactions = accounts
    .flatMap((a: any) => a.incomingTransactions || [])
    .filter((t) => t.amount > 0);
  const outcomingTransactions = accounts
    .flatMap((a: any) => a.outcomingTransactions || [])
    .filter((t) => t.amount > 0);

  const totalIncoming = incomingTransactions.reduce(
    (acc, curr) => acc + curr.amount,
    0,
  );
  const totalOutcoming = outcomingTransactions.reduce(
    (acc, curr) => acc + curr.amount,
    0,
  );
  const totalBalance = accounts.reduce(
    (acc, curr) => acc + (Number(curr.balance) || 0),
    0,
  );

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const exampleSpendingCategories = [
    {
      id: "cat1",
      name: "Contas de Casa",
      amount: Math.max(0, totalOutcoming * 0.45),
      color: "bg-yellow-400",
    },
    {
      id: "cat2",
      name: "Alimentação",
      amount: Math.max(0, totalOutcoming * 0.25),
      color: "bg-sky-400",
    },
    {
      id: "cat3",
      name: "Transporte",
      amount: Math.max(0, totalOutcoming * 0.15),
      color: "bg-fuchsia-400",
    },
  ];

  const sumExampleCategories = exampleSpendingCategories.reduce(
    (sum, cat) => sum + cat.amount,
    0,
  );

  let displaySpendingCategories = [...exampleSpendingCategories];

  if (totalOutcoming > sumExampleCategories) {
    displaySpendingCategories.push({
      id: "cat4",
      name: "Outros",
      amount: totalOutcoming - sumExampleCategories,
      color: "bg-slate-300",
    });
  } else if (sumExampleCategories > totalOutcoming && totalOutcoming > 0) {
  }

  return (
    <div className="page-container py-6 md:py-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-1 sm:mb-2">
          Olá, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Aqui está uma pequena revisão de como está o seu dinheiro.
        </p>
      </div>

      <div className="mb-6 md:mb-8">
        <SmartAdviceCard />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Seu Saldo{" "}
              <span className="text-lg font-medium text-gray-500">(total)</span>
            </h3>
            <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
              <i className="fa-solid fa-ellipsis-vertical text-lg"></i>
            </button>
          </div>

          <p className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
            <small className="text-gray-500 font-medium text-2xl">R$ </small>
            {formatCurrency(totalBalance)}
          </p>

          <div className="mt-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4">
              <h4 className="text-lg font-semibold text-gray-700">
                Suas Contas
              </h4>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-finance-primary focus:border-finance-primary transition-all w-full flex-grow sm:w-44"
                />
                <button className="p-2 text-gray-500 hover:text-finance-primary hover:bg-gray-100 rounded-md transition-colors flex-shrink-0">
                  <i className="fa-solid fa-filter"></i>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {visibleAccounts.length > 0 ? (
                visibleAccounts.map((account) => (
                  <div
                    onClick={() => {
                      navigate(`/dashboard/contas/${account.id}`);
                    }}
                    key={account.id}
                    className="p-3 rounded-lg hover:bg-slate-50 transition-colors duration-150 cursor-pointer flex items-center justify-between border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-finance-primary flex items-center justify-center text-white flex-shrink-0">
                        <i className="fa-solid fa-landmark"></i>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-base font-semibold text-gray-800 truncate">
                          R$ {formatCurrency(Number(account.balance) || 0)}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {account.bank} |{" "}
                          <span className="capitalize">{account.type}</span>
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-finance-primary hover:text-finance-primary-dark whitespace-nowrap ml-2">
                      Detalhes
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 py-3 text-center">
                  Nenhuma conta encontrada.
                </p>
              )}

              {filteredAccounts.length > 3 && (
                <button
                  onClick={() => setShowAllAccounts(!showAllAccounts)}
                  className="w-full mt-4 py-2.5 px-4 btn-gradient rounded-lg text-sm font-medium text-white"
                >
                  {showAllAccounts
                    ? "Mostrar menos contas"
                    : `Mostrar mais ${remainingAccountsCount} conta${remainingAccountsCount > 1 ? "s" : ""}`}
                </button>
              )}
            </div>
            <button
              onClick={() => openModal("createAccount")}
              className="w-full mt-3 py-2.5 px-4 btn-gradient rounded-lg text-sm font-medium text-white"
            >
              <i className="fa-solid fa-plus mr-1.5"></i>
              Adicionar Conta
            </button>
            <CreateAccountModal isOpen={isOpen("createAccount")} onClose={() => closeModal("createAccount")} />
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Visão Geral de Gastos
            </h3>
            <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
              <i className="fa-solid fa-ellipsis-vertical text-lg"></i>
            </button>
          </div>

          <div className="mb-4">
            <p className="text-3xl lg:text-4xl font-bold text-gray-800">
              R${formatCurrency(totalOutcoming)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Total de saídas no período
            </p>
          </div>

          {totalOutcoming > 0 && (
            <div className="mb-5">
              <div className="flex w-full h-4 rounded-full overflow-hidden bg-slate-100">
                {displaySpendingCategories.map(
                  (category) =>
                    category.amount > 0 && (
                      <div
                        key={category.id}
                        className={`${category.color} h-full transition-all duration-300 ease-in-out`}
                        style={{
                          width: `${(category.amount / totalOutcoming) * 100}%`,
                        }}
                        title={`${category.name}: ${formatCurrency(category.amount)} (${((category.amount / totalOutcoming) * 100).toFixed(1)}%)`}
                      ></div>
                    ),
                )}
              </div>
            </div>
          )}

          <h4 className="text-md font-semibold text-gray-700 mb-3 pt-1">
            Principais Categorias
          </h4>
          <div className="space-y-2.5">
            {displaySpendingCategories.map(
              (category) =>
                category.amount > 0 && (
                  <div
                    key={category.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center space-x-2.5">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${category.color} flex-shrink-0`}
                      ></span>
                      <p className="text-gray-600">{category.name}</p>
                    </div>
                    <p className="font-medium text-gray-800">
                      {formatCurrency(category.amount)}
                    </p>
                  </div>
                ),
            )}
            {totalOutcoming === 0 && (
              <p className="text-sm text-gray-500 py-3 text-center">
                Nenhum gasto no período.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Distribuição de Contas
          </h3>
          <div
            className="flex justify-center items-center"
            style={{ height: "280px" }}
          >
            {accounts.length > 0 ? (
              <PieChart
                series={[
                  {
                    data: pieData,
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 2,
                    cornerRadius: 5,
                    highlightScope: { fade: "global", highlight: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -5,
                      color: "gray",
                    },
                  },
                ]}
                slotProps={{
                  legend: {
                    direction: "row" as Direction,
                    position: { vertical: "bottom", horizontal: "center" },
                  },
                }}
                height={280}
              />
            ) : (
              <div className="text-gray-500 text-base text-center py-10">
                Nenhuma conta disponível para exibir o gráfico.
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Fluxo de Caixa (Entradas vs Saídas)
          </h3>
          <div
            className="flex justify-center items-center"
            style={{ height: "280px" }}
          >
            {totalIncoming > 0 || totalOutcoming > 0 ? (
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: ["Entradas", "Saídas"],
                    tickLabelStyle: { fontSize: 12 },
                  },
                ]}
                yAxis={[
                  {
                    label: "Valor (R$)",
                    labelStyle: {
                      fontSize: 12,
                      transform: `translateY(-10px)`,
                    },
                    tickLabelStyle: { fontSize: 10 },
                  },
                ]}
                series={[
                  {
                    data: [totalIncoming, totalOutcoming],
                    color: "#453ee3",
                    label: "Valor",
                  },
                ]}
                height={280}
                margin={{ left: 60, right: 20, top: 30, bottom: 30 }}
                slotProps={{
                  bar: {
                    rx: 5,
                  },
                }}
              />
            ) : (
              <div className="text-gray-500 text-base text-center py-10">
                Nenhuma transação disponível para exibir o fluxo.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
