import { useAccountContext } from "@/app/contexts/account-context/account-context";
import { useCardContext } from "@/app/contexts/card-context/card-context";
import type { budget } from "@/app/types/budget-type";
import { useState } from "react";
import { useParams } from "react-router";

interface CreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateCardModal({
  isOpen,
  onClose,
}: CreateAccountModalProps) {
  const [n_cartao, setn_cartao] = useState("");
  const [type, setType] = useState("");
  const [limit, setLimit] = useState("");
  const { addCard } = useCardContext();
  const params = useParams<{ id: string }>();
  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addCard(
      {
        card_number: n_cartao,
        card_type: type as "credito" | "debito",
        limit: Number(limit),
      },
      params.id || "0",
    );
    setn_cartao("");
    setType("");
    setLimit("");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-950/40 " onClick={onClose}></div>
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-lg">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Fechar modal</span>
          </button>

          <div className="p-4 md:p-5 text-center">
            <svg
              className="mx-auto mb-4 text-finance-primary w-12 h-12"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <h3 className="mb-5 text-lg font-normal text-gray-700">
              Adicionar Novo Cartão
            </h3>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                Numero do Cartão
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={n_cartao}
                  onChange={(e) => setn_cartao(e.target.value)}
                  autoComplete="cc-number"
                  inputMode="numeric"
                  className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-finance-primary block w-full  "
                  placeholder="4242 4242 4242 4242"
                  pattern="^4[0-9]{12}(?:[0-9]{3})?$"
                  required
                />
                <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                  {(() => {
                    const cardNumber = n_cartao || "";
                    const firstDigit = cardNumber.charAt(0);
                    const firstTwoDigits = cardNumber.substring(0, 2);
                    const firstFourDigits = cardNumber.substring(0, 4);

                    if (firstDigit === "4") {
                      return (
                        <i className="fa-brands fa-cc-visa text-3xl text-finance-primary-dark"></i>
                      );
                    } else if (
                      firstDigit === "5" ||
                      (parseInt(firstFourDigits) >= 2221 &&
                        parseInt(firstFourDigits) <= 2720)
                    ) {
                      return (
                        <i className="fa-brands fa-cc-mastercard text-3xl text-finance-primary-dark"></i>
                      );
                    } else if (
                      firstTwoDigits === "34" ||
                      firstTwoDigits === "37"
                    ) {
                      return (
                        <i className="fa-brands fa-cc-amex text-3xl text-finance-primary-dark"></i>
                      );
                    } else if (firstDigit === "6") {
                      return (
                        <i className="fa-brands fa-cc-discover text-3xl text-finance-primary-dark"></i>
                      );
                    } else {
                      return (
                        <i className="fa-solid fa-credit-card text-3xl text-finance-primary-dark"></i>
                      );
                    }
                  })()}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                  Tipo de Cartão
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-finance-primary focus:outline-none"
                  required
                >
                  <option value="">Selecione o tipo</option>
                  <option value="debito">Debito</option>
                  <option value="credito">Credito</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                  Limite do Cartão
                </label>
                <input
                  type="number"
                  value={limit}
                  min={1}
                  onChange={(e) => setLimit(e.target.value)}
                  placeholder="0,00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-finance-primary focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-[70%] text-center text-white bg-finance-primary hover:bg-finance-primary-dark focus:ring-4 focus:outline-none focus:ring-finance-primary font-medium rounded-lg text-sm items-center px-5 py-2.5"
              >
                Adicionar Conta
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
