import { useAccountContext } from "@/app/contexts/account-context.tsx/account-context"; // Assuming this path is correct
import type { Account } from "@/app/types/account-type"; // Assuming this path is correct
import { useParams } from "react-router"; // Not used in the provided snippet, but keeping if it's for other parts
import { useState } from "react";

// Assuming Font Awesome is globally available via CSS import (e.g., in your main HTML or a global CSS file)

interface DisplayCard extends Account {
  cardNumberSuffix: string;
  holderName: string;
  brand?: "visa" | "mastercard";
  bgColorClass?: string;
  textColorClass?: string;
}

const mockAccounts: DisplayCard[] = [
  {
    id: "1",
    bank: "Rodrigo Vlado",
    type: "debit",
    cardNumberSuffix: "8910",
    holderName: "Rodrigo Vlado",
    brand: "visa",
    bgColorClass: "bg-gray-900",
    textColorClass: "text-white",
  },
  {
    id: "2",
    bank: "Tech Innovate",
    type: "credit",
    cardNumberSuffix: "5678",
    holderName: "Maya Singh",
    brand: "visa",
    bgColorClass: "bg-slate-800",
    textColorClass: "text-white",
  },
  {
    id: "3",
    bank: "Digital Plus",
    type: "debit",
    cardNumberSuffix: "1234",
    holderName: "Alex Green",
    brand: "visa",
    bgColorClass: "bg-sky-700",
    textColorClass: "text-white",
  },
];

const recentContacts = [
  { name: "Anna", color: "bg-pink-400" },
  { name: "Jhon", color: "bg-blue-400" },
  { name: "Arror", color: "bg-green-400" },
  { name: "Della", color: "bg-yellow-400" },
  { name: "Carlyn", color: "bg-indigo-400" },
];

const transactionHistoryData = [
  {
    name: "Theresa Webb",
    id: "39635",
    status: "Completed",
    date: "October 31, 2017",
    amount: "$15,182.32",
    type: "income",
  },
  {
    name: "Dianne Russell",
    id: "97174",
    status: "Pending",
    date: "April 28, 2016",
    amount: "$10,075.14",
    type: "income",
  },
  {
    name: "Guy Hawkins",
    id: "22739",
    status: "Pending",
    date: "May 9, 2014",
    amount: "-$41,013.11",
    type: "expense",
  },
  {
    name: "Annette Black",
    id: "43178",
    status: "Completed",
    date: "November 7, 2017",
    amount: "$7,239.85",
    type: "income",
  },
];

// Mock data for Budgets
const mockBudgetsData = [
  {
    id: "b1",
    name: "Supermercado & Comida",
    icon: "fa-solid fa-cart-shopping",
    iconBgStyle: { background: 'var(--color-gradient-orange)' },
    totalAmount: 2000,
    spentAmount: 750, // Example: 750 spent out of 2000
    currency: "R$",
  },
  {
    id: "b2",
    name: "Assinaturas & Serviços",
    icon: "fa-solid fa-rss",
    iconBgStyle: { background: 'var(--color-gradient-purple)' },
    totalAmount: 350,
    spentAmount: 150, // Example: 150 spent out of 350
    currency: "R$",
  },
  {
    id: "b3",
    name: "Lazer & Entretenimento",
    icon: "fa-solid fa-film",
    iconBgStyle: { background: 'var(--color-gradient-teal)' },
    totalAmount: 800,
    spentAmount: 600, // Example: 600 spent out of 800
    currency: "R$",
  },
];


export default function AccountMainRoute() {
  const [accounts] = useState<DisplayCard[]>(mockAccounts);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  const selectedCard = accounts[selectedCardIndex];

  if (!selectedCard) {
    return (
      <div className="page-container py-8 flex items-center justify-center min-h-[calc(100vh-var(--sidebar-width,0px))]">
        <div className="text-center p-8 bg-white rounded-xl shadow-xl">
          <i className="fa-solid fa-exclamation-triangle text-5xl text-yellow-500 mx-auto mb-5"></i>
          <h1 className="text-2xl font-semibold text-gray-800">
            No Account Data
          </h1>
          <p className="text-gray-600 mt-1">
            Account data could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  const handleNextCard = () => {
    setSelectedCardIndex((prevIndex) => (prevIndex + 1) % accounts.length);
  };

  const handlePrevCard = () => {
    setSelectedCardIndex(
      (prevIndex) => (prevIndex - 1 + accounts.length) % accounts.length,
    );
  };

  return (
    <div className="page-container py-6 md:py-8">
      <header className="mb-6 md:mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl md:text-[32px] font-bold text-gray-800">
          Banco Digital
        </h1>
        <div className="flex items-center space-x-2.5">
          <button className="py-2.5 px-5 text-sm border border-gray-300/80 rounded-full hover:bg-gray-100/60 hover:border-gray-400/70 flex items-center space-x-2 text-gray-700 bg-white shadow-sm transition-all duration-150">
            <i className="fa-solid fa-filter text-xs"></i>
            <span>Filtrar</span>
          </button>
          <button className="py-2.5 px-5 text-sm border border-gray-300/80 rounded-full hover:bg-gray-100/60 hover:border-gray-400/70 flex items-center space-x-2 text-gray-700 bg-white shadow-sm transition-all duration-150">
            <i className="fa-solid fa-file-export text-xs"></i>
            <span>Exportar</span>
          </button>

        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-6 md:gap-x-8 md:gap-y-8">
        <div className="lg:col-span-5 space-y-6 md:space-y-8">
          <div className="card p-5 md:p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold text-gray-800">Cartões</h2>
              <a
                href="#"
                className="text-sm text-[var(--color-finance-primary)] hover:text-[var(--color-finance-primary-dark)] font-medium"
              >
                Ver todos
              </a>
            </div>

            <div className="mb-5">
              <div
                className={`p-6 rounded-2xl shadow-xl flex flex-col justify-between relative min-h-[200px] sm:min-h-[220px] ${selectedCard.bgColorClass || "bg-gray-900"} ${selectedCard.textColorClass || "text-white"}`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-2xl font-semibold">
                    {selectedCard.bank}
                  </span>
                  <div className="bg-gray-300/20 backdrop-blur-sm p-1.5 rounded-md w-[60px] h-[38px] flex items-center justify-center">
                    <i className="fa-brands fa-cc-visa text-3xl text-white"></i>
                  </div>
                </div>
                <div className="my-auto py-3">
                  <p className="text-2xl sm:text-3xl font-mono tracking-wider">
                    ···· ···· ···· {selectedCard.cardNumberSuffix}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400/90 mb-0.5">
                    Titular do Cartão
                  </p>
                  <p className="text-base font-medium">
                    {selectedCard.holderName}
                  </p>
                </div>
              </div>
            </div>

            {accounts.length > 1 && (
              <div className="flex justify-center items-center space-x-4 my-6">
                <button
                  onClick={handlePrevCard}
                  aria-label="Previous card"
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-200/70 hover:text-gray-700 transition-colors"
                >
                  <i className="fa-solid fa-chevron-left text-lg"></i>
                </button>
                <div className="flex space-x-2">
                  {accounts.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedCardIndex(idx)}
                      aria-label={`Select card ${idx + 1}`}
                      className={`w-2.5 h-2.5 rounded-full ${selectedCardIndex === idx ? "bg-[var(--color-finance-primary)] scale-125" : "bg-gray-300 hover:bg-gray-400"} transition-all duration-150`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNextCard}
                  aria-label="Next card"
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-200/70 hover:text-gray-700 transition-colors"
                >
                  <i className="fa-solid fa-chevron-right text-lg"></i>
                </button>
              </div>
            )}

            <div className="space-y-3">
                <button
                  className="w-full flex items-center justify-between p-3.5 text-left text-gray-700 hover:bg-gray-100/70 rounded-lg transition-colors duration-150 group"
                >
                  <span className="font-medium text-sm">Editar Limite</span>
                  <i
                    className={`fa-solid fa-chevron-right text-gray-400 group-hover:text-gray-500 transition-colors duration-150 text-xs`}
                  ></i>
                </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="btn-gradient w-full py-3 px-3 text-sm font-medium rounded-lg flex items-center justify-center space-x-1.5 animate-wave">
                <i className="fa-solid fa-plus text-xs"></i>
                <span>Adicionar Cartão</span>
              </button>
              <button className="w-full py-3 px-3 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-200/70 transition-colors duration-150 flex items-center justify-center space-x-1.5">
                <i className="fa-solid fa-trash-alt text-xs"></i>
                <span>Remover Cartão</span>
              </button>
            </div>
          </div>

          {/* --- New Budgets Card --- */}
          <div className="card p-5 md:p-6">
            <div className="flex justify-between items-center mb-5"> {/* Increased mb from 4 to 5 */}
              <h2 className="text-xl font-semibold text-gray-800">Orçamentos</h2>
              <a
                href="#"
                className="text-sm text-[var(--color-finance-primary)] hover:text-[var(--color-finance-primary-dark)] font-medium"
              >
                Ver todos
              </a>
            </div>
            <div className="space-y-5"> {/* space-y-5 is good for separation */}
              {mockBudgetsData.map((budget) => {
                const percentage = budget.totalAmount > 0 ? (budget.spentAmount / budget.totalAmount) * 100 : 0;
                const remainingAmount = budget.totalAmount - budget.spentAmount;
                return (
                  <div key={budget.id} className="budget-item">
                    <div className="flex items-center mb-2"> {/* Increased mb from 1.5 to 2 */}
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-white mr-3 shadow-md flex-shrink-0"
                        style={budget.iconBgStyle}
                      >
                        <i className={`${budget.icon} text-base`}></i>
                      </div>
                      <div className="flex-grow min-w-0">
                        <span className="font-medium text-gray-700 text-sm block truncate pr-2">
                          {budget.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-800 whitespace-nowrap ml-2">
                        {budget.currency}
                        {budget.totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 dark:bg-gray-700"> {/* Changed bg-gray-200 to bg-slate-200 for a slightly different tone */}
                      <div
                        className="bg-[var(--color-finance-primary)] h-2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-gray-500"> {/* Increased mt from 1.5 to 2 */}
                      <span>
                        Gasto: {budget.currency}
                        {budget.spentAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <span>
                        Restante: {budget.currency}
                        {remainingAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="mt-6 w-full flex items-center justify-center py-3.5 px-4 border-2 border-dashed border-gray-300 hover:border-[var(--color-finance-primary-light)] rounded-lg text-gray-500 hover:text-[var(--color-finance-primary)] transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-[var(--color-finance-primary-light)]/50"> {/* Increased py, added focus style */}
              <i className="fa-solid fa-plus mr-2 text-sm transition-transform duration-200 group-hover:rotate-90"></i>
              <span className="text-sm font-medium">Criar Novo Orçamento</span>
            </button>
          </div>
          {/* --- End New Budgets Card --- */}

        </div>

        {/* --- Right Column --- */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8">
          <div className="card p-5 md:p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Saldo total
            </h3>
            <p className="text-4xl md:text-[40px] font-bold text-gray-800 mb-5">
              <span className="text-2xl md:text-[28px] text-gray-500/90 font-medium align-baseline">
                R$
              </span>{" "}
              12.135,00
            </p>
            <div className="grid sm:grid-cols-3 gap-2.5">
              <button className="btn-gradient col-span-full sm:col-span-1 py-3 px-4 text-sm font-medium rounded-lg flex items-center justify-center space-x-2 animate-wave">
                <i className="fa-solid fa-paper-plane text-xs"></i>
                <span>Enviar</span>
              </button>
              <button className="py-3 px-4 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200/70 transition-colors duration-150 flex items-center justify-center space-x-2">
                <i className="fa-solid fa-arrow-down-to-bracket text-xs"></i>
                <span>Requisitar</span>
              </button>
              <button className="py-3 px-4 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200/70 transition-colors duration-150 flex items-center justify-center space-x-2">
                <i className="fa-solid fa-arrow-up-from-bracket text-xs"></i>
                <span>Top Up</span>
              </button>
            </div>
          </div>

          <div className="card p-5 md:p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-semibold text-gray-800">
                Contatos
              </h3>
              <a
                href="#"
                className="text-sm text-[var(--color-finance-primary)] hover:text-[var(--color-finance-primary-dark)] font-medium"
              >
                Ver todos
              </a>
            </div>
            <div className="flex items-center space-x-3.5 overflow-x-auto pb-2 -mx-1 px-1">
              <button
                aria-label="Add new contact"
                className="-mt-[13px] flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 bg-slate-100 hover:bg-slate-200/70 rounded-full text-[var(--color-finance-primary)] transition-all duration-150 group"
              >
                <i className="fa-solid fa-plus text-xl transition-transform duration-150 group-hover:scale-110"></i>
              </button>
              {recentContacts.map((contact) => (
                <div
                  key={contact.name}
                  className="flex-shrink-0 text-center w-16"
                >
                  <div
                    className={`w-14 h-14 mx-auto rounded-full ${contact.color} flex items-center justify-center text-white font-semibold text-xl mb-1.5 shadow-md ring-2 ring-white/80`}
                  >
                    {contact.name.substring(0, 1)}
                  </div>
                  <span className="text-xs text-gray-600/90 truncate w-full block">
                    {contact.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5 md:p-6 ">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-semibold text-gray-800">
                Transações Recentes
              </h3>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100/70 rounded-lg transition-colors duration-150">
                <i className="fa-solid fa-ellipsis text-base"></i>
              </button>
            </div>
            <div className="overflow-x-auto h-[470px]">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500/80 uppercase sr-only md:not-sr-only">
                  <tr>
                    <th scope="col" className="py-3 px-2 font-medium">
                      Transaction
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-2 font-medium text-center"
                    >
                      Status
                    </th>
                    <th scope="col" className="py-3 px-2 font-medium">
                      Date
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-2 font-medium text-right"
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactionHistoryData.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200/60 last:border-b-0 hover:bg-gray-50/50 transition-colors duration-100"
                    >
                      <td className="py-4 px-2 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`flex-shrink-0 w-9 h-9 rounded-lg ${item.status === "Completed" ? "bg-green-100" : "bg-yellow-100"} flex items-center justify-center`}
                          >
                            {item.status === "Completed" ? (
                              <i className="fa-solid fa-check text-green-600"></i>
                            ) : (
                              <i className="fa-solid fa-hourglass-half text-yellow-600"></i>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-500/90">
                              ID: {item.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2 whitespace-nowrap text-center">
                        <span
                          className={`px-2.5 py-1 inline-block text-xs leading-tight font-semibold rounded-md ${
                            item.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-2 whitespace-nowrap text-gray-600/90">
                        {item.date}
                      </td>
                      <td
                        className={`py-4 px-2 whitespace-nowrap font-semibold text-right ${item.type === "income" ? "text-green-600" : "text-red-600"}`}
                      >
                        {item.amount.startsWith("-") ? "" : "+"}
                        {item.amount.replace("$-", "-$")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}