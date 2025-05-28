// HomeRoute.jsx
import { useState } from "react";
import { useAuth } from "@/app/contexts/auth/auth-context";
import { useAccountContext } from "@/app/contexts/account-context.tsx/account-context";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
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
  const visibleAccounts = showAllAccounts ? accounts : accounts.slice(0, 3);
  const remainingAccounts = accounts.length - 3;
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

  return (
    <div className="page-container">
      <div className="mb-6">
        <h1 className="text-4xl sm:text-3xl font-bold text-gray-900 mb-2">
          Olá, {user?.name} 👋
        </h1>
        <p className="text-gray-600 text-xl ">
          Aqui está uma pequena revisão de como está o seu dinheiro.
        </p>
      </div>

      <div className="mb-6">
        <SmartAdviceCard />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-gray-900">
              Seu Saldo <small>(total)</small>
            </h3>
            <button className="text-gray-400 hover:text-gray-600 transition-colors p-1.5">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>

          <p className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            R$
            {totalBalance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>

          <div className="space-y-2 mt-8 ">
            <h4 className="text-[1.15em] font-medium text-gray-600 mb-3">
              Suas Contas{" "}
              <input
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-3 ml-10 py-1.5 text-sm rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-finance-primary-light transition-all w-[130px] sm:w-[150px]"
              />{" "}
              <i className=" hover:cursor-pointer hover:text-finance-primary-dark text-[1em] fa-regular fa-filters float-right"></i>
            </h4>

            {visibleAccounts
              .filter((a: Account) => {
                return (
                  a.bank.toLowerCase().includes(search.toLowerCase()) || ""
                );
              })
              .map((account, idx) => (
                <div
                  onClick={() => {
                    navigate(`/dashboard/contas/${account.id}`);
                  }}
                  key={idx}
                  className={`account-row ${
                    account.type === "corrente"
                      ? "account-corrente"
                      : "account-poupanca"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="account-icon w-10 h-10 rounded-lg flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-semibold">
                        R${account.balance || "0,00"}
                      </p>
                      <p className="account-id">
                        {account.bank} | {account.type}
                      </p>
                    </div>
                  </div>
                  <button className="text-sm px-2 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 rounded transition">
                    Detalhes
                  </button>
                </div>
              ))}

            {accounts.length > 3 && (
              <button
                onClick={() => setShowAllAccounts(!showAllAccounts)}
                className="hover:cursor-pointer w-full mt-3 py-3 px-4 btn-gradient rounded-lg text-[1.15em] font-medium"
              >
                {showAllAccounts
                  ? "Mostrar menos"
                  : `Mostrar mais ${remainingAccounts} conta${remainingAccounts > 1 ? "s" : ""}`}
              </button>
            )}
            <button
              onClick={openModal}
              className=" hover:cursor-pointer w-full py-3 px-4  btn-gradient rounded-lg text-[1.15em] font-medium "
            >
              Adicionar Conta
            </button>
            <CreateAccountModal isOpen={isOpen} onClose={closeModal} />
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-gray-900">
              Visão Geral de Gastos
            </h3>
            <button className="text-gray-400 hover:text-gray-600 transition-colors p-1.5">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>

          <div className="mb-5">
            <div className="flex items-baseline gap-2 mb-1">
              <p className="text-4xl lg:text-5xl font-bold text-gray-900">
                R$
                {totalOutcoming.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </p>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-sl font-medium bg-red-100 text-red-800">
                <svg
                  className="w-3 h-3 mr-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 10.293a1 1 0 010 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L10 11.586V6a1 1 0 012 0v5.586l1.293-1.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                2.5%
              </span>
            </div>
            <p className="text-[1.15em] text-gray-500">
              De R$
              {(totalOutcoming * 1.5).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>

          <div className="mb-5">
            <div className="flex justify-between text-sl mb-2">
              <span className="text-gray-600 ">Progresso</span>
              <span className="text-gray-900 font-medium">
                {Math.round((totalOutcoming / (totalOutcoming * 1.5)) * 100) ||
                  0}
                %
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min((totalOutcoming / (totalOutcoming * 1.5)) * 100, 100)}%`,
                }}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 rounded-full bg-yellow-400 flex-shrink-0"></div>
              <div className="min-w-0 flex-1">
                <p className="text-sl text-gray-600">Família & Amigos</p>
                <p className="text-base font-semibold">R$7.908,00</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-blue-400 flex-shrink-0"></div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-600">Educação</p>
                <p className="text-base font-semibold">R$4.230,00</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-purple-400 flex-shrink-0"></div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-600">Outros</p>
                <p className="text-base font-semibold">R$2.150,00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="card">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
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
                    outerRadius: 90,
                    paddingAngle: 2,
                    cornerRadius: 5,
                  },
                ]}
                width={300}
                height={260}
                slotProps={{
                  legend: {
                    direction: "horizontal",
                    position: { vertical: "bottom", horizontal: "center" },
                  },
                }}
              />
            ) : (
              <div className="text-gray-500 text-lg">
                Nenhuma conta disponível
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Fluxo de Caixa
          </h3>
          <div
            className="flex justify-center items-center"
            style={{ height: "280px" }}
          >
            {incomingTransactions.length > 0 ||
            outcomingTransactions.length > 0 ? (
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: ["Entradas", "Saídas"],
                    tickLabelStyle: { fontSize: 14 },
                  },
                ]}
                series={[
                  { data: [totalIncoming, totalOutcoming], color: "#453ee3" },
                ]}
                width={300}
                height={260}
                margin={{ left: 70, right: 20, top: 20, bottom: 40 }}
              />
            ) : (
              <div className="text-gray-500 text-lg">
                Nenhuma transação disponível
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
