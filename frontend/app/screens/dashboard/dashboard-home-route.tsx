import { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/auth-context";
import { useAccountContext } from "@/app/contexts/account-context";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import type { Direction } from "@mui/x-charts";
import SmartAdviceCard from "@/app/components/ui/advice-ai-card";
import { useNavigate } from "react-router";
import CreateAccountModal from "@/app/components/ui/modals/create-account-modal";
import { useModal } from "@/app/hooks/modal-controller-hook";
import type { Account } from "@/app/types/account-type";
import FilterModal, {
  type FilterOption,
} from "@/app/components/ui/modals/filter-modal";
import { useDynamicFilter } from "@/app/hooks/filter-hook";
import { useAiInteraction } from "@/app/hooks/ai-hook";
import { useCategories } from "@/app/contexts/select-context";
export default function HomeRoute() {
  const { isOpen, openModal, closeModal } = useModal();
  const { user } = useAuth();
  const { accounts } = useAccountContext();
  const [showAllAccounts, setShowAllAccounts] = useState(false);
  const [search, setSearch] = useState("");
  const [accountFilterModalOpen, setAccountFilterModalOpen] = useState(false);
  const { responseAnalyzes, isLoading, error, generateAnalyzes } =
    useAiInteraction();
  const { categories, addCategory } = useCategories();
  const incomingTransactions = accounts
    .flatMap((a: any) => a.incomingTransactions || [])
    .filter((t) => t.amount > 0);
  const outcomingTransactions = accounts
    .flatMap((a: any) => a.outgoingTransactions || [])
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

  useEffect(() => {
    let prompt = `Olá! Sou ${user?.name?.split(" ")[0] || "um usuário"}. `;
    if (accounts && accounts.length > 0) {
      prompt += `Tenho ${accounts.length} conta(s) com um saldo total de R$ ${formatCurrency(totalBalance)}. `;
      prompt += `Recentemente, tive R$ ${formatCurrency(totalIncoming)} em entradas e R$ ${formatCurrency(totalOutcoming)} em saídas. `;
      prompt += `Aqui estão os detalhes das minhas contas: ${JSON.stringify(
        accounts.map((acc) => ({
          bank: acc.bank,
          type: acc.type,
          balance: acc.balance,
        })),
      )}. `;
      prompt += `Minhas transações recentes incluem: ${JSON.stringify(
        outcomingTransactions.map((transaction) => {
          return {
            amount: transaction.amount,
            description: transaction.description,
            date: transaction.date,
            category: transaction.category?.name || "Sem categoria",
          };
        }),
      )}. `;
    } else {
      prompt += `Ainda não tenho contas cadastradas. `;
    }
    prompt +=
      "Poderia me dar uma visão geral e um conselho financeiro baseado nesses dados?";
    if (user && accounts && accounts.length > 0 && !isLoading) {
      generateAnalyzes(prompt);
    }
  }, [
    accounts,
    user,
    generateAnalyzes,
    totalIncoming,
    totalOutcoming,
    totalBalance,
  ]);

  const searchedAccounts = accounts.filter(
    (a: Account) =>
      a.bank.toLowerCase().includes(search.toLowerCase()) ||
      (a.type && a.type.toLowerCase().includes(search.toLowerCase())) ||
      (a.id && a.id.toString().toLowerCase().includes(search.toLowerCase())),
  );

  const accountModalFilters: Record<
    string,
    (item: Account, filterKey: string, extra: any) => boolean
  > = {
    corrente: (a) => a.type?.toLowerCase() === "corrente",
    poupanca: (a) => a.type?.toLowerCase() === "poupanca",
  };

  const {
    data: filteredAndSortedAccounts,
    setFilter: setAccountModalFilter,
    filter: currentAccountModalFilter,
    setSort: setAccountSort,
    sort: currentAccountSort,
  } = useDynamicFilter<Account>(
    searchedAccounts,
    accountModalFilters,
    "all",
    (account) => account.bank.toLowerCase(),
  );

  const accountFilterModalOptions: FilterOption[] = [
    { label: "Todas as Contas", value: "all" },
    { label: "Apenas Corrente", value: "corrente" },
    { label: "Apenas Poupança", value: "poupanca" },
    { label: "Ordenar por Banco (A-Z)", value: "az" },
    { label: "Ordenar por Banco (Z-A)", value: "za" },
  ];

  const visibleAccounts = showAllAccounts
    ? filteredAndSortedAccounts
    : filteredAndSortedAccounts.slice(0, 3);
  const remainingAccountsCount =
    filteredAndSortedAccounts.length - visibleAccounts.length;

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

  const availableColors = [
    "bg-red-400",
    "bg-orange-400",
    "bg-amber-400",
    "bg-lime-400",
    "bg-green-400",
    "bg-emerald-400",
    "bg-teal-400",
    "bg-cyan-400",
    "bg-sky-400",
    "bg-blue-400",
    "bg-indigo-400",
    "bg-violet-400",
    "bg-purple-400",
    "bg-fuchsia-400",
    "bg-pink-400",
    "bg-rose-400",
    "bg-yellow-400",
  ];

  let colorIndex = 0;
  const assignedColors = new Set();

  const getNextColor = () => {
    let attempts = 0;
    while (attempts < availableColors.length) {
      const color = availableColors[colorIndex % availableColors.length];
      colorIndex++;
      if (!assignedColors.has(color)) {
        assignedColors.add(color);
        return color;
      }
      attempts++;
    }
    return availableColors[Math.floor(Math.random() * availableColors.length)];
  };
  let displaySpendingCategories = categories
    ? categories
        .map((cat) => {
          const categoryTransactions = outcomingTransactions.filter((t) => {
            let transactionCategoryName: string | undefined;
            if (typeof t.category === "string") {
              transactionCategoryName = t.category;
            } else if (
              t.category &&
              typeof t.category === "object" &&
              t.category.name
            ) {
              transactionCategoryName = t.category.name;
            }
            return transactionCategoryName === cat.name;
          });
          const amount = categoryTransactions.reduce(
            (sum, t) => sum + t.amount,
            0,
          );
          return {
            id: cat.id || cat.name,
            name: cat.name,
            amount: amount,
            color: getNextColor(),
          };
        })
        .filter((item) => item.amount > 0)
    : [];

  const sumUserCategories = displaySpendingCategories.reduce(
    (sum, cat) => sum + cat.amount,
    0,
  );

  if (totalOutcoming > sumUserCategories) {
    displaySpendingCategories.push({
      id: "cat-outros",
      name: "Outros",
      amount: totalOutcoming - sumUserCategories,
      color: "bg-slate-300",
    });
  }
  displaySpendingCategories.sort((a, b) => b.amount - a.amount);

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
        <SmartAdviceCard
          response={responseAnalyzes}
          isLoading={isLoading}
          error={error}
        />
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
                <button
                  onClick={() => setAccountFilterModalOpen(true)}
                  className="p-2 text-gray-500 hover:text-finance-primary hover:bg-gray-100 rounded-md transition-colors flex-shrink-0"
                  aria-label="Filtrar contas"
                >
                  <i className="fa-solid fa-filter"></i>
                </button>
              </div>
            </div>

            <FilterModal
              isOpen={accountFilterModalOpen}
              onClose={() => setAccountFilterModalOpen(false)}
              title="Filtrar Contas"
              options={accountFilterModalOptions}
              selected={currentAccountSort || currentAccountModalFilter}
              onSelect={(value) => {
                if (value === "az" || value === "za") {
                  setAccountModalFilter("all");
                  setAccountSort(value as "az" | "za");
                } else {
                  setAccountSort(null);
                  setAccountModalFilter(value);
                }
                setAccountFilterModalOpen(false);
              }}
            />

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
                  {search ||
                  currentAccountModalFilter !== "all" ||
                  currentAccountSort
                    ? "Nenhuma conta encontrada para os filtros aplicados."
                    : "Nenhuma conta cadastrada."}
                </p>
              )}

              {filteredAndSortedAccounts.length > 3 && (
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
            <CreateAccountModal
              isOpen={isOpen("createAccount")}
              onClose={() => closeModal("createAccount")}
            />
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
