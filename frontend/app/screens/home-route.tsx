import { useState } from "react";

function ExampleChart() {
  // Dados fictícios para entradas e saídas
  const days = ["D1", "D2", "D3", "D4", "D5", "D6", "D7"];
  const inflow = [2000, 1800, 2200, 2100, 2400, 2300, 2500]; // Entradas (em R$)
  const outflow = [1200, 1400, 1100, 1300, 1250, 1500, 1450]; // Saídas (em R$)

  // Configurações do SVG
  const width = 350;
  const height = 200;
  const padding = 40;

  const allValues = [...inflow, ...outflow];
  const maxValue = Math.max(...allValues);

  // Calcula pontos X uniformemente distribuídos
  const xStep = (width - 2 * padding) / (days.length - 1);

  // Função auxiliar para converter valor em coordenada Y no SVG
  const toY = (value: any) => {
    const chartHeight = height - 2 * padding;
    // Inverte o eixo Y pois, em SVG, y=0 é o topo
    return padding + (1 - value / maxValue) * chartHeight;
  };

  // Gera string de pontos para cada linha (inflow e outflow)
  const inflowPoints = inflow
    .map((val, i) => {
      const x = padding + i * xStep;
      const y = toY(val);
      return `${x},${y}`;
    })
    .join(" ");

  const outflowPoints = outflow
    .map((val, i) => {
      const x = padding + i * xStep;
      const y = toY(val);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="w-full flex flex-col items-center">
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="max-w-md"
      >
        {/* Eixos X e Y */}
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke="#CBD5E0"
          strokeWidth="1"
        />
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="#CBD5E0"
          strokeWidth="1"
        />

        {/* Grid horizontal (marcas de valor) */}
        {[0.25, 0.5, 0.75, 1].map((frac, idx) => {
          const y = padding + (1 - frac) * (height - 2 * padding);
          const label = `R$${Math.round(maxValue * frac)}`;
          return (
            <g key={idx}>
              <line
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#E2E8F0"
                strokeWidth="0.5"
                strokeDasharray="4 2"
              />
              <text
                x={padding - 5}
                y={y + 4}
                textAnchor="end"
                className="text-[10px] text-gray-500"
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* Linha de Entradas (inflow) */}
        <polyline
          fill="none"
          stroke="var(--color-finance-in)"
          strokeWidth="2.5"
          points={inflowPoints}
          className="transition-all duration-500"
        />
        {/* Pontos de Entradas */}
        {inflow.map((val, i) => {
          const x = padding + i * xStep;
          const y = toY(val);
          return (
            <circle
              key={`in-${i}`}
              cx={x}
              cy={y}
              r="3.5"
              fill="var(--color-finance-in)"
            />
          );
        })}

        {/* Linha de Saídas (outflow) */}
        <polyline
          fill="none"
          stroke="var(--color-finance-out)"
          strokeWidth="2.5"
          points={outflowPoints}
          className="transition-all duration-500"
        />
        {/* Pontos de Saídas */}
        {outflow.map((val, i) => {
          const x = padding + i * xStep;
          const y = toY(val);
          return (
            <circle
              key={`out-${i}`}
              cx={x}
              cy={y}
              r="3.5"
              fill="var(--color-finance-out)"
            />
          );
        })}

        {/* Legenda */}
        <rect
          x={width - padding - 120}
          y={padding}
          width="110"
          height="40"
          fill="white"
          stroke="#E2E8F0"
          strokeWidth="1"
          rx="4"
        />
        <circle
          cx={width - padding - 104}
          cy={padding + 12}
          r="5"
          fill="var(--color-finance-in)"
        />
        <text
          x={width - padding - 95}
          y={padding + 16}
          className="text-[10px] text-gray-600"
        >
          Entradas
        </text>
        <circle
          cx={width - padding - 104}
          cy={padding + 28}
          r="5"
          fill="var(--color-finance-out)"
        />
        <text
          x={width - padding - 95}
          y={padding + 32}
          className="text-[10px] text-gray-600"
        >
          Saídas
        </text>

        {/* Rótulos X (dias) */}
        {days.map((d, i) => {
          const x = padding + i * xStep;
          return (
            <text
              key={i}
              x={x}
              y={height - padding + 14}
              textAnchor="middle"
              className="text-[10px] text-gray-500"
            >
              {d}
            </text>
          );
        })}
      </svg>
      <div className="mt-2 text-xs text-gray-600">
        Exemplo de entradas e saídas semanais
      </div>
    </div>
  );
}

function AiAnalysisCard() {
  // Dados fictícios para simular o resumo de IA baseado no gráfico acima
  const totalInflow = 2000 + 1800 + 2200 + 2100 + 2400 + 2300 + 2500; // R$15 300
  const totalOutflow = 1200 + 1400 + 1100 + 1300 + 1250 + 1500 + 1450; // R$9 200
  const netBalance = totalInflow - totalOutflow; // R$6 100

  return (
    <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Título com ícone FontAwesome Pro */}
      <div className="flex items-center mb-4">
        <i className="fas fa-robot text-finance-primary text-2xl mr-2"></i>
        <h3 className="font-semibold text-2xl text-gray-900">
          TechFinance AI ✨
        </h3>
      </div>
      {/* Saudação personalizada */}
      <p className="text-gray-700 mb-4">
        Olá, Bruno! É um prazer ajudá-lo a entender melhor sua situação
        financeira.
      </p>
      {/* Visão Geral Financeira */}
      <div className="bg-finance-bg rounded-lg p-4 mb-4">
        <h4 className="font-medium text-gray-800 mb-2">
          Visão Geral Financeira
        </h4>
        <p className="text-gray-600 text-sm">
          📊 <span className="font-semibold">Total de Entradas:</span>{" "}
          <span className="text-finance-in">
            R${totalInflow.toLocaleString()}
          </span>
        </p>
        <p className="text-gray-600 text-sm">
          📉 <span className="font-semibold">Total de Saídas:</span>{" "}
          <span className="text-finance-out">
            R${totalOutflow.toLocaleString()}
          </span>
        </p>
        <p className="text-gray-600 text-sm">
          💰 <span className="font-semibold">Saldo Líquido:</span>{" "}
          <span
            className={netBalance >= 0 ? "text-finance-in" : "text-finance-out"}
          >
            R${netBalance.toLocaleString()}
          </span>
        </p>
      </div>
      {/* Sugestões e insights gerados pela IA */}
      <div className="bg-finance-bg rounded-lg p-4 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-medium text-gray-800 mb-2">Insights da IA</h4>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mb-3">
            <li>
              Observamos que as entradas aumentaram 25% em relação à semana
              anterior.
            </li>
            <li>
              Os gastos com alimentação representam 35% do total de saídas.
              Considere revisar este orçamento.
            </li>
            <li>
              Você terminou a semana com saldo positivo de R$
              {netBalance.toLocaleString()}. Bom trabalho!
            </li>
          </ul>
        </div>
        <button className="mt-4 w-full btn-primary-solid px-4 py-2 rounded-lg text-base">
          Ver Recomendações
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-finance-bg min-h-screen text-gray-900 antialiased">
      <main>
        {/* Seção de Hero (permanece inalterada) */}
        <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="flex-1 space-y-8 text-center md:text-left">
              <span className="hero-badge mb-4">
                liberte-se das correntes financeiras
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
                Sua <span className="text-finance-primary-dark">Liberdade</span>{" "}
                financeira a um clique de distância
              </h1>
              <p className="text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
                Centralize todas as suas contas e cartões em um dashboard
                intuitivo e seguro.
              </p>
              <div className="flex items-center justify-center md:justify-start my-5">
                <svg
                  className="w-5 h-5 text-yellow-400 me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <p className="ms-2 text-sm font-bold text-gray-900">4.95</p>
                <span className="w-1 h-1 mx-1.5 bg-gray-400 rounded-full"></span>
                <a
                  href="#"
                  className="text-sm font-medium text-gray-700 underline hover:text-finance-primary hover:no-underline"
                >
                  73 reviews
                </a>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 justify-center md:justify-start">
                <button className="btn-gradient px-8 py-3.5 rounded-xl text-base">
                  Começar Grátis
                </button>
                <button className="btn-outline px-8 py-3.5 rounded-xl text-base">
                  Saiba mais
                </button>
              </div>
            </div>
            <div className="flex-[1.2] flex justify-center w-full mt-10 md:mt-0">
              <img
                src="/1.svg"
                alt="TechFinance App in use"
                className="w-full max-w-lg lg:max-w-xl h-auto object-contain"
              />
            </div>
          </div>
        </section>

        {/* Seção de Funcionalidades Principais (atualizada) */}
        <section id="features" className="py-16 sm:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 sm:mb-16 text-gray-900">
              Funcionalidades principais
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Cartão do Gráfico Interativo */}
              <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
                <div className="flex items-center mb-4">
                  <i className="fas fa-chart-line text-finance-primary text-2xl mr-2"></i>
                  <h3 className="font-semibold text-xl text-gray-900">
                    Gráfico Interativo
                  </h3>
                </div>
                <ExampleChart />
                <p className="text-gray-600 text-sm mt-4 text-center">
                  Visualize suas entradas e saídas de forma clara e interativa.
                </p>
              </div>

              {/* Cartão de Análise com IA */}
              <AiAnalysisCard />
            </div>
          </div>
        </section>

        {/* O restante do código (depoimentos, integrações, planos, FAQ, CTA) permanece inalterado */}
        <section className="py-16 sm:py-20 bg-finance-bg">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 text-gray-900">
              O que nossos usuários dizem
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center text-center">
                <div className="mb-4">
                  <svg
                    className="w-12 h-12 text-finance-primary bg-finance-bg rounded-full p-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="8"
                      r="4"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                    />
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M4 20c0-4 4-6 8-6s8 2 8 6"
                      fill="none"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 mb-3 text-sm">
                  "O TechFinance mudou minha relação com o dinheiro. Tudo muito
                  simples e seguro!"
                </p>
                <span className="font-semibold text-finance-purple">
                  Ana Souza
                </span>
                <span className="text-xs text-gray-400">Empreendedora</span>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center text-center">
                <div className="mb-4">
                  <svg
                    className="w-12 h-12 text-finance-primary bg-finance-bg rounded-full p-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="8"
                      r="4"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                    />
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M4 20c0-4 4-6 8-6s8 2 8 6"
                      fill="none"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 mb-3 text-sm">
                  "Consigo acompanhar meus gastos em tempo real e planejar
                  melhor meus objetivos."
                </p>
                <span className="font-semibold text-finance-purple">
                  Carlos Lima
                </span>
                <span className="text-xs text-gray-400">
                  Analista Financeiro
                </span>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center text-center">
                <div className="mb-4">
                  <svg
                    className="w-12 h-12 text-finance-primary bg-finance-bg rounded-full p-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="8"
                      r="4"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                    />
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M4 20c0-4 4-6 8-6s8 2 8 6"
                      fill="none"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 mb-3 text-sm">
                  "A integração com vários bancos facilitou muito minha rotina.
                  Recomendo!"
                </p>
                <span className="font-semibold text-finance-purple">
                  Juliana Alves
                </span>
                <span className="text-xs text-gray-400">Designer</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-finance-bg">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 sm:mb-12 text-gray-900">
              Integração com os principais bancos
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 sm:gap-x-12">
              <img
                src="/logos/itau.png"
                alt="Itaú"
                className="h-10 sm:h-12 filter grayscale opacity-70 hover:filter-none hover:opacity-100 transition-all duration-300"
              />
              <img
                src="/logos/nubank.png"
                alt="Nubank"
                className="h-10 sm:h-12 filter grayscale opacity-70 hover:filter-none hover:opacity-100 transition-all duration-300"
              />
              <img
                src="/logos/bradesco.png"
                alt="Bradesco"
                className="h-10 sm:h-12 filter grayscale opacity-70 hover:filter-none hover:opacity-100 transition-all duration-300"
              />
              <img
                src="/logos/inter.png"
                alt="Inter"
                className="h-10 sm:h-12 filter grayscale opacity-70 hover:filter-none hover:opacity-100 transition-all duration-300"
              />
            </div>
            <p className="mt-8 text-gray-600 max-w-md mx-auto">
              Conecte-se com segurança a mais de 50 instituições financeiras.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-12 sm:mb-16 text-gray-900">
              Planos para seu uso
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              <div className="flex flex-col bg-finance-bg rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-4 text-finance-purple">
                  Grátis
                </h3>
                <p className="text-4xl font-bold mb-1 text-finance-primary-dark">
                  R$0
                </p>
                <p className="text-xs text-gray-500 mb-6 opacity-0">
                  placeholder
                </p>
                <ul className="mb-8 space-y-3 text-left flex-grow">
                  <li className="text-sm text-gray-700 flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Dashboard básico
                  </li>
                  <li className="text-sm text-gray-700 flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Conexão 1 banco
                  </li>
                  <li className="text-sm text-gray-700 flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Suporte comum
                  </li>
                </ul>
                <button className="btn-primary-solid w-full px-6 py-3 font-semibold rounded-lg text-base">
                  Escolher
                </button>
              </div>
              <div className="flex flex-col bg-finance-bg rounded-2xl p-8 border border-gray-200 shadow-lg ring-2 ring-finance-primary scale-105 transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-4 text-finance-purple">
                  Pro
                </h3>
                <p className="text-4xl font-bold mb-1 text-finance-primary-dark">
                  R$29/mês
                </p>
                <p className="text-xs text-gray-500 mb-6">
                  cobrado mensalmente
                </p>
                <ul className="mb-8 space-y-3 text-left flex-grow">
                  <li className="text-sm text-gray-700 flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Dashboard avançado
                  </li>
                  <li className="text-sm text-gray-700 flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Conexão 5 bancos
                  </li>
                  <li className="text-sm text-gray-700 flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Suporte prioritário
                  </li>
                </ul>
                <button className="btn-gradient w-full px-6 py-3 font-semibold rounded-lg text-base">
                  Escolher
                </button>
              </div>
              <div className="flex flex-col bg-finance-bg rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-4 text-finance-purple">
                  Enterprise
                </h3>
                <p className="text-4xl font-bold mb-1 text-finance-primary-dark">
                  Sob consulta
                </p>
                <p className="text-xs text-gray-500 mb-6 opacity-0">
                  placeholder
                </p>
                <ul className="mb-8 space-y-3 text-left flex-grow">
                  <li className="text-sm text-gray-700 flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Customizações
                  </li>
                  <li className="text-sm text-gray-700 flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Integrações ilimitadas
                  </li>
                  <li className="text-sm text-gray-700 flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Suporte VIP
                  </li>
                </ul>
                <button className="btn-primary-solid w-full px-6 py-3 font-semibold rounded-lg text-base">
                  Contactar
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="py-16 sm:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 sm:mb-16 text-gray-900">
              Perguntas Frequentes
            </h2>
            <div className="space-y-5">
              <details className="p-5 border border-gray-200 rounded-xl bg-finance-bg group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-gray-800 hover:text-finance-primary">
                  É seguro conectar minha conta bancária?
                  <span className="text-finance-primary transition-transform duration-300 transform group-open:rotate-180">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                  Sim, usamos criptografia de nível bancário e não armazenamos
                  suas credenciais.
                </p>
              </details>
              <details className="p-5 border border-gray-200 rounded-xl bg-finance-bg group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-gray-800 hover:text-finance-primary">
                  Como são gerados os alertas em tempo real?
                  <span className="text-finance-primary transition-transform duration-300 transform group-open:rotate-180">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                  Você recebe notificações instantâneas via app sempre que
                  houver movimentações.
                </p>
              </details>
              <details className="p-5 border border-gray-200 rounded-xl bg-finance-bg group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-gray-800 hover:text-finance-primary">
                  Há versão mobile?
                  <span className="text-finance-primary transition-transform duration-300 transform group-open:rotate-180">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                  Sim, o TechFinance está disponível para iOS e Android.
                </p>
              </details>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28 bg-finance-bg text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 text-gray-900">
              Pronto para transformar sua vida financeira?
            </h2>
            <p className="text-lg mb-10 text-gray-600 max-w-xl mx-auto">
              Experimente o TechFinance grátis por 7 dias e veja a diferença.
            </p>
            <button className="btn-gradient px-10 py-4 font-semibold rounded-xl shadow-xl text-lg">
              Criar conta grátis
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
