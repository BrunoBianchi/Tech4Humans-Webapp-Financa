import { useContactContext } from "@/app/contexts/contact-context";
import type { Contact } from "@/app/types/contact-type";
import { useState } from "react";
import { useParams } from "react-router";

interface CreateContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateContactModal({
  isOpen,
  onClose,
}: CreateContactModalProps) {
  const [accountNumberState, setAccountNumber] = useState("");
  const [accountNameState, setAccountName] = useState("");
  const params = useParams<{ id: string }>();
  const { addContact } = useContactContext();
  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addContact({
      name: accountNameState,
      destinationAccountId: accountNumberState,
    } as Contact);
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
              Novo Contato
            </h3>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                  Nome
                </label>
                <input
                  type="string"
                  value={accountNameState}
                  min={1}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="Nome..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-finance-primary focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                  Conta de destino
                </label>
                <input
                  type="string"
                  value={accountNumberState}
                  min={1}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="ACCOUNT_..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-finance-primary focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-[70%] text-center text-white bg-finance-primary hover:bg-finance-primary-dark focus:ring-4 focus:outline-none focus:ring-finance-primary font-medium rounded-lg text-sm items-center px-5 py-2.5"
              >
                Adicionar Contato
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
