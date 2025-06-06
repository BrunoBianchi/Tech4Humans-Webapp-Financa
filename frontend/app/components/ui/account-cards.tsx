import { useState } from "react";

export default function AccountCard({
  loading = false,
  accountName = "Conta Empresarial",
  iban = "ES34 5666 6789 8765 3245 1111",
  type = "corrente",
  linkedCards = 2,
  balance = "R$ 140.347,00 ",
  onClick = () => {},
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  if (loading) {
    return (
      <div className="relative w-[30%] mt-10 max-w-sm rounded-2xl border border-gray-200 bg-white p-5 shadow-sm animate-pulse">
        <div className="flex items-start gap-3 mb-5">
          <div className="h-10 w-10 rounded-full bg-gray-300"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
      </div>
    );
  }
  return (
    <div
      onClick={onClick}
      className="hover:cursor-pointer mt-10 relative w-[30%] max-w-sm rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 text-white font-bold flex items-center justify-center text-sm">
              TF
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-800">
                {accountName}
              </h3>
              <p className="text-xs text-gray-500">
                {iban} | {type}
              </p>
              <p className="text-xs text-gray-500">
                {linkedCards} cartões vinculados
              </p>
            </div>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="5" cy="12" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="19" cy="12" r="1.5" />
            </svg>
          </button>
        </div>

        <div className="mt-5">
          <p className="text-2xl font-bold text-gray-800">R$ {balance}</p>
        </div>
      </div>

      {menuOpen && (
        <div className="absolute right-4 top-20 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
          <button className="w-full px-4 py-3 flex items-center gap-2 text-sm text-gray-800 hover:bg-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536M9 11l6.536-6.536a2 2 0 112.828 2.828L11.828 13.828a2 2 0 01-1.414.586H9v-2.414a2 2 0 01.586-1.414z"
              />
            </svg>
            Renomear
          </button>
          <button className="w-full px-4 py-3 flex items-center gap-2 text-sm text-red-600 hover:bg-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7L5 7M10 11v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3"
              />
            </svg>
            Excluir conta
          </button>
          <button className="w-full px-4 py-3 flex items-center gap-2 text-sm text-green-600 hover:bg-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v6h6M20 20v-6h-6M5 19a9 9 0 0014-14"
              />
            </svg>
            Mudar acreditação
          </button>
        </div>
      )}
    </div>
  );
}
