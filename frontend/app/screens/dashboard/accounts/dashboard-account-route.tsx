import { useAccountContext } from "@/app/contexts/account-context";
import type { Account } from "@/app/types/account-type";
import { useParams } from "react-router";
import { useState } from "react";
import CreateCardModal from "@/app/components/ui/modals/create-card-modal";
import { useModal } from "@/app/hooks/modal-controller-hook";
import { useAuth } from "@/app/contexts/auth-context";
import { useCardContext } from "@/app/contexts/card-context";
import CreateTransactionModal from "@/app/components/ui/modals/create-transaction-modal";
import { useTransactionContext } from "@/app/contexts/transaction-context";
import type { Transaction } from "@/app/types/transaction-type";
import { useContactContext } from "@/app/contexts/contact-context";
import CreateContactModal from "@/app/components/ui/modals/create-contact-modal";
import CreateFastTransactionModal from "@/app/components/ui/modals/fast-transaction-modal";
import type { Contact } from "@/app/types/contact-type";
import FilterModal, {
  type FilterOption,
} from "@/app/components/ui/modals/filter-modal";
import { useDynamicFilter } from "@/app/hooks/filter-hook";


export default function AccountMainRoute() {
  const { getAccountById } = useAccountContext();
  const { user } = useAuth();
  const { transactions } = useTransactionContext();
  const { contacts } = useContactContext();
  const { isOpen, openModal, closeModal } = useModal();
  const params = useParams<{ id: string }>();
  const { cards, removeCard } = useCardContext();
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>(
    contacts[0],
  );
  const account: Account | null = getAccountById(params.id || "0");

  const [transactionFilterModalOpen, setTransactionFilterModalOpen] =
    useState(false);

  const transactionFilters: Record<
    string,
    (item: Transaction, filterKey: string, extra: any) => boolean
  > = {
    entrada: (t, _filterKey, _extra) =>
      (t.destinationAccount as any)?.id === account?.id,
    saida: (t, _filterKey, _extra) =>
      (t.sourceAccount as any)?.id === account?.id,
    period: (t, _filterKey, extra) => {
      if (!extra?.from || !extra?.to || !t.date) return true;
      const transactionDate = new Date(t.date);
      const fromDate = new Date(extra.from);
      const toDate = new Date(extra.to);
      toDate.setHours(23, 59, 59, 999);
      return transactionDate >= fromDate && transactionDate <= toDate;
    },
  };

  const {
    data: filteredTransactions,
    setFilter: setTransactionFilter,
    filter: currentTransactionFilter,
    setExtra: setTransactionFilterExtra,
    extra: transactionFilterExtra,
    setSort: setTransactionSort,
  } = useDynamicFilter<Transaction>(transactions, transactionFilters, "all");

  const transactionFilterModalOptions: FilterOption[] = [
    { label: "Todas", value: "all" },
    { label: "Entradas", value: "entrada" },
    { label: "Saídas", value: "saida" },
    { label: "Período", value: "period" },
    { label: "A-Z (por ID)", value: "az" },
    { label: "Z-A (por ID)", value: "za" },
  ];

  if (!account)
    return (
      <div className="page-container py-8 flex items-center justify-center min-h-[calc(100vh-var(--sidebar-width,0px))] -mt-40">
        <div className="text-center p-10 bg-white rounded-xl shadow-xl">
          <i className="fa-solid fa-exclamation-triangle text-5xl text-yellow-500 mx-auto mb-5"></i>
          <h1 className="text-2xl font-semibold text-gray-800">
            Conta não encontrada
          </h1>
          <p className="text-gray-600 mt-1">
            A conta que você está tentando acessar não existe ou foi removida.
          </p>
        </div>
      </div>
    );

  const selectedCard = cards[selectedCardIndex];

  const handleNextCard = () => {
    setSelectedCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrevCard = () => {
    setSelectedCardIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length,
    );
  };

  return (
    <div className="page-container py-6 md:py-8">
      <header className="mb-6 md:mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl md:text-[32px] font-bold text-gray-800">
          Banco digital{" "}
          <span className=" text-[var(--color-finance-primary)]">
            {account.bank}
          </span>
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
            </div>
            {cards.length > 0 ? (
              <div className="mb-5">
                <div
                  className={`p-6 rounded-2xl shadow-xl flex flex-col justify-between relative min-h-[200px] sm:min-h-[220px] bg-gray-900 text-white`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-2xl font-semibold">
                      {account.bank}
                    </span>
                    <div className="bg-gray-300/20 backdrop-blur-sm p-1.5 rounded-md w-[60px] h-[38px] flex items-center justify-center">
                      {(() => {
                        const cardNumber = selectedCard?.cardNumber || "";
                        const firstDigit = cardNumber.charAt(0);
                        const firstTwoDigits = cardNumber.substring(0, 2);
                        const firstFourDigits = cardNumber.substring(0, 4);

                        if (firstDigit === "4") {
                          return (
                            <i className="fa-brands fa-cc-visa text-3xl text-white"></i>
                          );
                        } else if (
                          firstDigit === "5" ||
                          (parseInt(firstFourDigits) >= 2221 &&
                            parseInt(firstFourDigits) <= 2720)
                        ) {
                          return (
                            <i className="fa-brands fa-cc-mastercard text-3xl text-white"></i>
                          );
                        } else if (
                          firstTwoDigits === "34" ||
                          firstTwoDigits === "37"
                        ) {
                          return (
                            <i className="fa-brands fa-cc-amex text-3xl text-white"></i>
                          );
                        } else if (firstDigit === "6") {
                          return (
                            <i className="fa-brands fa-cc-discover text-3xl text-white"></i>
                          );
                        } else {
                          return <></>;
                        }
                      })()}
                    </div>
                  </div>
                  <div className="my-auto py-3">
                    <p className="text-2xl sm:text-3xl font-mono tracking-wider">
                      ···· ···· ···· {selectedCard?.cardNumber.slice(-4)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400/90 mb-0.5">
                      Titular do Cartão
                    </p>
                    <p className="text-base font-medium">{user?.name}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-10">
                <i className="fa-solid fa-credit-card text-4xl mb-3"></i>
                <p className="text-sm">Nenhum cartão cadastrado.</p>
              </div>
            )}
            {cards.length > 1 && (
              <div className="flex justify-center items-center space-x-4 my-6">
                <button
                  onClick={handlePrevCard}
                  aria-label="Previous card"
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-200/70 hover:text-gray-700 transition-colors"
                >
                  <i className="fa-solid fa-chevron-left text-lg"></i>
                </button>
                <div className="flex space-x-2">
                  {cards.map((_, idx) => (
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
            {cards.length > 0 ? (
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3.5 text-left text-gray-700 hover:bg-gray-100/70 rounded-lg transition-colors duration-150 group">
                  <span className="font-medium text-sm">Editar Limite</span>
                  <i
                    className={`fa-solid fa-chevron-right text-gray-400 group-hover:text-gray-500 transition-colors duration-150 text-xs`}
                  ></i>
                </button>
              </div>
            ) : (
              <div> </div>
            )}

            <div
              className={`mt-6 grid ${cards.length > 0 ? "grid-cols-2" : ""} gap-3`}
            >
              <button
                onClick={() => openModal("createCard")}
                className="hover:cursor-pointer btn-gradient w-full py-3 px-3 text-sm font-medium rounded-lg flex items-center justify-center space-x-1.5 animate-wave"
              >
                <i className="fa-solid fa-plus text-xs"></i>
                <span>Adicionar Cartão</span>
              </button>
              <CreateCardModal
                isOpen={isOpen("createCard")}
                onClose={() => closeModal("createCard")}
              ></CreateCardModal>
              {cards.length > 0 ? (
                <button
                  onClick={() => {
                    removeCard(selectedCard.id || "", account.id || "0");
                  }}
                  className="hover:cursor-pointer w-full py-3 px-3 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-200/70 transition-colors duration-150 flex items-center justify-center space-x-1.5"
                >
                  <i className="fa-solid fa-trash-alt text-xs"></i>
                  <span>Remover Cartão</span>
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>


        </div>

        <div className="lg:col-span-7 space-y-6 md:space-y-8">
          <div className="card p-5 md:p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Saldo total
            </h3>
            <p className="text-4xl md:text-[40px] font-bold text-gray-800 mb-5">
              <span className="text-2xl md:text-[28px] text-gray-500/90 font-medium align-baseline">
              R$
              </span>{" "}
              {Number(account.balance).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              })}{" "}
              <span
                className={`text-base font-medium ${
                  (() => {
                    const pendingTransactions = transactions.filter(
                      (t) =>
                        t.status === "pending" &&
                        ((t.destinationAccount as any)?.id === account.id ||
                          (t.sourceAccount as any)?.id === account.id)
                    );
                    const pendingBalance = pendingTransactions.reduce((acc, t) => {
                      if ((t.destinationAccount as any)?.id === account.id) {
                        return acc + Number(t.amount);
                      } else if ((t.sourceAccount as any)?.id === account.id) {
                        return acc - Number(t.amount);
                      }
                      return acc;
                    }, 0);
                    if (pendingBalance > 0) return "text-finance-in";
                    if (pendingBalance < 0) return "text-finance-out";
                    return "text-gray-500/80";
                  })()
                } align-middle ml-2`}
                style={{ display: "inline-flex", alignItems: "center", height: "1.8em" }}
              >
                (
                {(() => {
                  const pendingTransactions = transactions.filter(
                    (t) =>
                      t.status === "pending" &&
                      ((t.destinationAccount as any)?.id === account.id ||
                        (t.sourceAccount as any)?.id === account.id)
                  );
                  const pendingBalance = pendingTransactions.reduce((acc, t) => {
                    if ((t.destinationAccount as any)?.id === account.id) {
                      return acc + Number(t.amount);
                    } else if ((t.sourceAccount as any)?.id === account.id) {
                      return acc - Number(t.amount);
                    }
                    return acc;
                  }, 0);
                  const formatted = Math.abs(pendingBalance).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  });
                  return pendingBalance === 0
                    ? "sem saldo pendente"
                    : pendingBalance > 0
                    ? `+ R$ ${formatted} pendente`
                    : `- R$ ${formatted} pendente`;
                })()}
                )
              </span>
            </p>
            <div className="grid sm:grid-cols-3 gap-2.5">
              <button
                onClick={() => openModal("createTransaction")}
                className="hover:cursor-pointer btn-gradient col-span-full sm:col-span-1 py-3 px-4 text-sm font-medium rounded-lg flex items-center justify-center space-x-2 animate-wave"
              >
                <i className="fa-solid fa-paper-plane text-xs"></i>
                <span>Enviar</span>
              </button>
              <CreateTransactionModal
                isOpen={isOpen("createTransaction")}
                onClose={() => closeModal("createTransaction")}
              ></CreateTransactionModal>
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
              <h3 className="text-xl font-semibold text-gray-800">Contatos</h3>
              <a
                href="#"
                className="text-sm text-[var(--color-finance-primary)] hover:text-[var(--color-finance-primary-dark)] font-medium"
              >
                Ver todos
              </a>
            </div>
            <div className="flex items-center space-x-3.5 overflow-x-auto pb-2 -mx-1 px-1">
              <button
                onClick={() => openModal("contactModal")}
                aria-label="Add new contact"
                className=" hover:cursor-pointer -mt-[13px] flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 bg-slate-100 hover:bg-slate-200/70 rounded-full text-[var(--color-finance-primary)] transition-all duration-150 group"
              >
                <i className="fa-solid fa-plus text-xl transition-transform duration-150 group-hover:scale-110"></i>
              </button>
              <CreateContactModal
                isOpen={isOpen("contactModal")}
                onClose={() => closeModal("contactModal")}
              ></CreateContactModal>
              {contacts.length > 0 ? (
                contacts.slice(0, 4).map((contact) => (
                  <div
                    key={contact.name + Math.floor(Math.random() * 1000)}
                    onClick={() => {
                      setSelectedContact(contact);
                      openModal("createFastTransaction");
                    }}
                    className="flex-shrink-0 text-center w-16"
                  >
                    <div
                      className={`hover:cursor-pointer hover:bg-finance-purple-dark w-14 h-14 mx-auto rounded-full bg-finance-purple flex items-center justify-center text-white font-semibold text-xl mb-1.5 shadow-md ring-2 ring-white/80`}
                    >
                      {contact.name.substring(0, 1)}
                    </div>
                    <span className="text-xs text-gray-600/90 truncate w-full block">
                      {contact.name}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-10 mx-auto">
                  <i className="fa-solid fa-address-book text-4xl mb-3"></i>
                  <p className="text-sm">Nenhum contato cadastrado.</p>
                </div>
              )}
              <CreateFastTransactionModal
                contact={selectedContact ?? contacts[0]}
                isOpen={isOpen("createFastTransaction")}
                onClose={() => closeModal("createFastTransaction")}
              ></CreateFastTransactionModal>

              {contacts.length > 4 ? (
                <div className="flex-shrink-0 text-center w-16">
                  <div className="w-14 h-14 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold text-xl mb-1.5 shadow-md ring-2 ring-white/80">
                    +{contacts.length - 4}
                  </div>
                  <span className="text-xs text-gray-600/90 truncate w-full block">
                    Mais contatos
                  </span>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="card p-5 md:p-6 ">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-semibold text-gray-800">
                Transações Recentes
              </h3>
              <button
                onClick={() => setTransactionFilterModalOpen(true)}
                className="hover:cursor-pointer p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100/70 rounded-lg transition-colors duration-150"
              >
                <i className="fa-solid fa-filter"></i>
              </button>
            </div>

            <FilterModal
              isOpen={transactionFilterModalOpen}
              onClose={() => setTransactionFilterModalOpen(false)}
              title="Filtrar Transações"
              options={transactionFilterModalOptions}
              selected={currentTransactionFilter}
              onSelect={(value) => {
                if (value === "az" || value === "za") {
                  setTransactionSort(value as "az" | "za");
                } else {
                  setTransactionSort(null);
                  setTransactionFilter(value);
                }
                if (value !== "period") {
                  setTransactionFilterModalOpen(false);
                }
              }}
            >
              {currentTransactionFilter === "period" && (
                <div className="space-y-3 mt-4 pt-4 border-t">
                  <p className="text-sm font-medium text-gray-700">
                    Selecionar período:
                  </p>
                  <div className="flex gap-3">
                    <input
                      type="date"
                      aria-label="Data inicial"
                      value={transactionFilterExtra.from || ""}
                      onChange={(e) =>
                        setTransactionFilterExtra((prev: any) => ({
                          ...prev,
                          from: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-finance-primary focus:outline-none"
                    />
                    <input
                      type="date"
                      aria-label="Data final"
                      value={transactionFilterExtra.to || ""}
                      onChange={(e) =>
                        setTransactionFilterExtra((prev: any) => ({
                          ...prev,
                          to: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-finance-primary focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={() => setTransactionFilterModalOpen(false)}
                    className="w-full mt-3 btn-gradient py-2.5 rounded-lg text-sm font-medium"
                  >
                    Aplicar Período
                  </button>
                </div>
              )}
            </FilterModal>

            <div className="overflow-x-auto h-[auto]">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500/80 uppercase sr-only md:not-sr-only">
                  <tr>
                    <th scope="col" className="py-3 px-2 font-medium">
                      Transaction
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
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((item: Transaction) => (
                      <tr
                        key={item.id}
                        className="border-b border-gray-200/60 last:border-b-0 hover:bg-gray-50/50 transition-colors duration-100"
                      >
                        <td className="py-4 px-2 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`flex-shrink-0 w-10 h-10 rounded-lg ${
                                item.status === "completed"
                                  ? "bg-green-100"
                                  : "bg-yellow-100"
                              } flex items-center justify-center`}
                            >
                              {item.status === "completed" ? (
                                <i className="fa-solid fa-check text-green-600"></i>
                              ) : (
                                <i className="fa-solid fa-hourglass-half text-yellow-600"></i>
                              )}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-800">
                                {((item.sourceAccount as any)?.id === account.id
                                  ? (item.destinationAccount as any)?.user?.name
                                  : (item.sourceAccount as any)?.user?.name) ||
                                  "Detalhe da Transação"}
                              </div>
                              <div className="text-xs text-gray-500/90">
                                ID: {item.id?.substring(0, 8) || "N/A"}...
                              </div>
                              <div className="text-xs text-gray-500/90 mt-0.5">
                                Tipo:{" "}
                                <span className="capitalize">
                                  {item.type ? item.type : "Desconhecido"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-2 whitespace-nowrap text-gray-600/90">
                          {item.date
                            ? new Date(item.date).toLocaleDateString("pt-BR", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              })
                            : "N/A"}
                        </td>
                        <td
                          className={`py-4 px-2 whitespace-nowrap font-semibold text-right ${
                            (item.sourceAccount as any)?.id !== account.id
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {(item.sourceAccount as any)?.id !== account.id
                            ? `+ R$ ${Number(item.amount).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                            : `- R$ ${Number(item.amount).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className="text-center text-gray-500 py-10"
                      >
                        <i className="fa-solid fa-right-left text-4xl mb-3"></i>
                        <p className="text-sm">
                          Nenhuma transação encontrada para os filtros
                          aplicados.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
