const WaveIcon = () => (
  <div className="w-8 h-8 rounded-full flex items-center justify-center animate-wave bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
    <i className="fa-solid fa-wand-magic-sparkles text-white text-lg"></i>
  </div>
);

interface SmartAdviceCardProps {
  response: any | null;
  isLoading: boolean;
  error: string | null;
}

export default function SmartAdviceCard({
  response: advice,
  isLoading,
  error,
}: SmartAdviceCardProps) {
  const cardBaseClass =
    "card p-5 text-white rounded-xl shadow-lg text-gray-800 ";
  const headerClass = "text-xl font-semibold mb-3 text-gray-800";
  const textClass = "text-x opacity-90 text-gray-800 p-10";
  if (isLoading) {
    return (
      <div className="max-w-[100%] mt-10 p-6 bg-white rounded-2xl shadow-md flex flex-col space-y-4 mb-3">
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl font-semibold text-gray-800">
            TechFinance AI
          </h2>
          <WaveIcon />
        </div>
        <div className=" max-h-[250px] overflow-y-auto">
          <h3
            className={`${headerClass} animate-pulse flex items-center text-center`}
          >
            <span className="mr-2">🔄</span>
            Carregando conselho inteligente...
          </h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${cardBaseClass} bg-red-500`}>
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl font-semibold text-gray-800">
            TechFinance AI
          </h2>
          <WaveIcon />
        </div>
        <h3 className={headerClass}>⚠️ Erro ao carregar conselho</h3>
        <p className={textClass}>{error}</p>
      </div>
    );
  }

  if (advice) {
    const response = JSON.parse(advice);
    return (
      <div
        className={`${cardBaseClass} bg-gradient-to-r from-finance-primary to-finance-primary-light `}
      >
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl font-semibold text-gray-800">
            TechFinance AI
          </h2>
          <WaveIcon />
        </div>
        <div className=" max-h-[250px] overflow-y-auto">
          <span
            className={textClass}
            dangerouslySetInnerHTML={{
              __html: response.choices[0]
                ? response.choices[0].message.content
                : `Nenhum conselho disponível no momento.`,
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`${cardBaseClass} bg-gray-400`}>
      <h3 className={headerClass}>💡 Conselho Inteligente</h3>
      <p className={textClass}>Nenhum conselho disponível no momento.</p>
    </div>
  );
}
