export type FilterOption = {
  label: string;
  value: string;
};

export type FilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  options: FilterOption[];
  selected: string;
  onSelect: (value: string) => void;
  children?: React.ReactNode;
};

export default function FilterModal({
  isOpen,
  onClose,
  title = "Filtrar",
  options,
  selected,
  onSelect,
  children,
}: FilterModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-950/40" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-auto p-6 animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 rounded-lg p-2 transition"
            aria-label="Fechar modal"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>
        <div className="space-y-3">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onSelect(opt.value)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
                selected === opt.value
                  ? "bg-[var(--color-finance-primary)] text-white border-[var(--color-finance-primary)]"
                  : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
              }`}
            >
              <span>{opt.label}</span>
              {selected === opt.value && (
                <i className="fa-solid fa-check text-white"></i>
              )}
            </button>
          ))}
        </div>
        {children && <div className="mt-5">{children}</div>}
      </div>
    </div>
  );
}
