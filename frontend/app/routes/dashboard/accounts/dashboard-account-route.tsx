import { useAccountContext } from "@/app/contexts/account-context.tsx/account-context";
import type { Account } from "@/app/types/account-type";
import { useParams } from "react-router";
import { useState } from "react";

// Assuming Font Awesome is globally available

interface DisplayCard extends Account {
  cardNumberSuffix: string;
  holderName: string;
  // For specific styling, e.g., if different cards had different brand logos or subtle color themes
  brand?: 'visa' | 'mastercard'; // Example
  bgColorClass?: string; // e.g., 'bg-gray-900'
  textColorClass?: string; // e.g., 'text-white'
}

const mockAccounts: DisplayCard[] = [
  { 
    id: "1", bank: "Rodrigo Vlado", type: "debit", 
    cardNumberSuffix: "8910", holderName: "Rodrigo Vlado", 
    brand: "visa", bgColorClass: "bg-gray-900", textColorClass: "text-white"
  },
  { 
    id: "2", bank: "Tech Innovate", type: "credit", 
    cardNumberSuffix: "5678", holderName: "Maya Singh",
    brand: "visa", bgColorClass: "bg-slate-800", textColorClass: "text-white"
  },
  { 
    id: "3", bank: "Digital Plus", type: "debit", 
    cardNumberSuffix: "1234", holderName: "Alex Green",
    brand: "visa", bgColorClass: "bg-sky-700", textColorClass: "text-white"
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
  { name: "Theresa Webb", id: "39635", status: "Completed", date: "October 31, 2017", amount: "$15,182.32", type: "income" },
  { name: "Dianne Russell", id: "97174", status: "Pending", date: "April 28, 2016", amount: "$10,075.14", type: "income" },
  { name: "Guy Hawkins", id: "22739", status: "Pending", date: "May 9, 2014", amount: "-$41,013.11", type: "expense" },
  { name: "Annette Black", id: "43178", status: "Completed", date: "November 7, 2017", amount: "$7,239.85", type: "income" },
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
          <h1 className="text-2xl font-semibold text-gray-800">No Account Data</h1>
          <p className="text-gray-600 mt-1">Account data could not be loaded.</p>
        </div>
      </div>
    );
  }
  
  const handleNextCard = () => {
    setSelectedCardIndex((prevIndex) => (prevIndex + 1) % accounts.length);
  };

  const handlePrevCard = () => {
    setSelectedCardIndex((prevIndex) => (prevIndex - 1 + accounts.length) % accounts.length);
  };

  return (
    <div className="page-container  ">
      <header className="mb-6 md:mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl md:text-[32px] font-bold text-gray-800">Wallet</h1>
        <div className="flex items-center space-x-2.5">
          <button className="py-2.5 px-5 text-sm border border-gray-300/80 rounded-full hover:bg-gray-100/60 hover:border-gray-400/70 flex items-center space-x-2 text-gray-700 bg-white shadow-sm transition-all duration-150">
            <i className="fa-solid fa-filter text-xs"></i>
            <span>Filter</span>
          </button>
          <button className="py-2.5 px-5 text-sm border border-gray-300/80 rounded-full hover:bg-gray-100/60 hover:border-gray-400/70 flex items-center space-x-2 text-gray-700 bg-white shadow-sm transition-all duration-150">
            <i className="fa-solid fa-file-export text-xs"></i>
            <span>Export</span>
          </button>
          <button className="btn-gradient py-2.5 px-5 text-sm rounded-full flex items-center space-x-2 animate-wave">
            <i className="fa-solid fa-plus text-xs"></i>
            <span>Add Card</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-4  gap-y-8">
        <div className="lg:col-span-5 space-y-6"> 
          <div className="card p-5 md:p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold text-gray-800">Cards</h2>
              <a href="#" className="text-sm text-[var(--color-finance-primary)] hover:text-[var(--color-finance-primary-dark)] font-medium">See All</a>
            </div>

            {/* --- New Single Card Display --- */}
            <div className="mb-5">
              <div 
                className={`p-6 rounded-2xl shadow-xl flex flex-col justify-between relative min-h-[200px] sm:min-h-[200px] ${selectedCard.bgColorClass || 'bg-gray-900'} ${selectedCard.textColorClass || 'text-white'}`}
              >
                {/* Top Section of Card */}
                <div className="flex justify-between items-start">
                  <span className="text-2xl font-semibold">{selectedCard.bank}</span>
                  {/* VISA Logo Block */}
                  <div className="bg-gray-300/20 backdrop-blur-sm p-1.5 rounded-md w-[60px] h-[38px] flex items-center justify-center">
                     {/* Using Font Awesome for VISA, replace with actual SVG/img if available */}
                    <i className="fa-brands fa-cc-visa text-3xl text-white"></i>
                  </div>
                </div>

                {/* Card Number Section */}
                <div className="my-auto py-3">
                  <p className="text-2xl sm:text-3xl font-mono tracking-wider">···· ···· ···· {selectedCard.cardNumberSuffix}</p>
                </div>

                {/* Bottom Section of Card */}
                <div>
                  <p className="text-xs text-gray-400/90 mb-0.5">Card Holder name</p>
                  <p className="text-base font-medium">{selectedCard.holderName}</p>
                </div>
              </div>
            </div>
            
            {/* Card Navigation */}
            {accounts.length > 1 && (
              <div className="flex justify-center items-center space-x-4 my-6">
                <button onClick={handlePrevCard} aria-label="Previous card" className="p-2 rounded-full text-gray-500 hover:bg-gray-200/70 hover:text-gray-700 transition-colors">
                  <i className="fa-solid fa-chevron-left text-lg"></i>
                </button>
                <div className="flex space-x-2">
                    {accounts.map((_,idx) => (
                        <button 
                            key={idx} 
                            onClick={() => setSelectedCardIndex(idx)}
                            aria-label={`Select card ${idx+1}`}
                            className={`w-2.5 h-2.5 rounded-full ${selectedCardIndex === idx ? 'bg-[var(--color-finance-primary)] scale-125' : 'bg-gray-300 hover:bg-gray-400' } transition-all duration-150`}
                        />
                    ))}
                </div>
                <button onClick={handleNextCard} aria-label="Next card" className="p-2 rounded-full text-gray-500 hover:bg-gray-200/70 hover:text-gray-700 transition-colors">
                  <i className="fa-solid fa-chevron-right text-lg"></i>
                </button>
              </div>
            )}
            {/* --- End New Single Card Display --- */}
            
            <div className="space-y-3">
              {([ "Edit Limits"] as const).map((label) => (
                <button key={label} className="w-full flex items-center justify-between p-3.5 text-left text-gray-700 hover:bg-gray-100/70 rounded-lg transition-colors duration-150 group">
                  <span className="font-medium text-sm">{label}</span>
                  <i className={`fa-solid fa-chevron-right text-gray-400 group-hover:text-gray-500 transition-colors duration-150 text-xs`}></i>
                </button>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="btn-gradient w-full py-3 px-3 text-sm font-medium rounded-lg flex items-center justify-center space-x-1.5 animate-wave">
                <i className="fa-solid fa-plus text-xs"></i>
                <span>Add Card</span>
              </button>
              <button className="w-full py-3 px-3 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-200/70 transition-colors duration-150 flex items-center justify-center space-x-1.5">
                 <i className="fa-solid fa-trash-alt text-xs"></i>
                <span>Remove</span>
              </button>
            </div>
            
            <div className="mt-6 p-3.5 bg-yellow-50 border border-yellow-300/70 rounded-lg text-sm text-yellow-800/90 flex items-start space-x-2.5">
              <i className="fa-solid fa-info-circle text-yellow-600 mt-0.5 shrink-0"></i>
              <span>You have USD 1,000 pending money. It will be ready in 2 business days.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Balance, Contacts, History */}
        <div className="lg:col-span-7 space-y-6"> {/* Adjusted width from lg:col-span-8 */}
          <div className="card p-5 md:p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Balance</h3>
            <p className="text-4xl md:text-[40px] font-bold text-gray-800 mb-5">12,135,00 <span className="text-2xl md:text-[28px] text-gray-500/90 font-medium align-baseline">USD</span></p>
            <div className="grid sm:grid-cols-3 gap-2.5">
              <button className="btn-gradient col-span-full sm:col-span-1 py-3 px-4 text-sm font-medium rounded-lg flex items-center justify-center space-x-2 animate-wave">
                <i className="fa-solid fa-paper-plane text-xs"></i>
                <span>Send</span>
              </button>
              <button className="py-3 px-4 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200/70 transition-colors duration-150 flex items-center justify-center space-x-2">
                <i className="fa-solid fa-arrow-down-to-bracket text-xs"></i>
                <span>Request</span>
              </button>
              <button className="py-3 px-4 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200/70 transition-colors duration-150 flex items-center justify-center space-x-2">
                <i className="fa-solid fa-arrow-up-from-bracket text-xs"></i>
                <span>Top Up</span>
              </button>
            </div>
          </div>
          
          <div className="card p-5 md:p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-semibold text-gray-800">Recent Contacts</h3>
              <a href="#" className="text-sm text-[var(--color-finance-primary)] hover:text-[var(--color-finance-primary-dark)] font-medium">See All</a>
            </div>
            <div className="flex items-center space-x-3.5 overflow-x-auto pb-2 -mx-1 px-1">
              <button 
                aria-label="Add new contact"
                className="-mt-[13px] flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 bg-slate-100 hover:bg-slate-200/70 rounded-full text-[var(--color-finance-primary)] transition-all duration-150 group"
              >
                <i className="fa-solid fa-plus text-xl transition-transform duration-150 group-hover:scale-110"></i>
              </button>
              {recentContacts.map((contact) => (
                <div key={contact.name} className="flex-shrink-0 text-center w-16">
                  <div className={`w-14 h-14 mx-auto rounded-full ${contact.color} flex items-center justify-center text-white font-semibold text-xl mb-1.5 shadow-md ring-2 ring-white/80`}>
                    {contact.name.substring(0, 1)}
                  </div>
                  <span className="text-xs text-gray-600/90 truncate w-full block">{contact.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5 md:p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-semibold text-gray-800">Transaction History</h3>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100/70 rounded-lg transition-colors duration-150">
                <i className="fa-solid fa-ellipsis-h text-base"></i>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500/80 uppercase sr-only md:not-sr-only">
                    <tr>
                        <th scope="col" className="py-3 px-2 font-medium">Transaction</th>
                        <th scope="col" className="py-3 px-2 font-medium text-center">Status</th>
                        <th scope="col" className="py-3 px-2 font-medium">Date</th>
                        <th scope="col" className="py-3 px-2 font-medium text-right">Amount</th>
                    </tr>
                </thead>
                <tbody>
                  {transactionHistoryData.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200/60 last:border-b-0 hover:bg-gray-50/50 transition-colors duration-100">
                      <td className="py-4 px-2 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                           <div className={`flex-shrink-0 w-9 h-9 rounded-lg ${item.status === "Completed" ? "bg-green-100" : "bg-yellow-100"} flex items-center justify-center`}>
                             {item.status === "Completed" ? 
                                <i className="fa-solid fa-check text-green-600"></i> :
                                <i className="fa-solid fa-hourglass-half text-yellow-600"></i>
                             }
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">{item.name}</div>
                            <div className="text-xs text-gray-500/90">ID: {item.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2 whitespace-nowrap text-center">
                        <span className={`px-2.5 py-1 inline-block text-xs leading-tight font-semibold rounded-md ${
                          item.status === "Completed" ? "bg-green-100 text-green-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-2 whitespace-nowrap text-gray-600/90">{item.date}</td>
                      <td className={`py-4 px-2 whitespace-nowrap font-semibold text-right ${item.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {item.amount.startsWith('-') ? '' : '+'}{item.amount.replace('$-', '-$')}
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