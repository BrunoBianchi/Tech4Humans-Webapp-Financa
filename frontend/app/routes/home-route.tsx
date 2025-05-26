// Home.tsx
import React from "react";

const features = [
  {
    icon: "/icons/contas.svg",
    title: "Múltiplas contas",
    description: "Gerencie diferentes bancos e cartões em um só lugar.",
  },
  {
    icon: "/icons/notificacoes.svg",
    title: "Alertas em tempo real",
    description: "Receba notificações de gastos e movimentações.",
  },
  {
    icon: "/icons/planejamento.svg",
    title: "Planejamento financeiro",
    description: "Crie orçamentos e acompanhe metas com facilidade.",
  },
];

const banks = [
  { src: "/logos/itau.svg", alt: "Itaú" },
  { src: "/logos/nubank.svg", alt: "Nubank" },
  { src: "/logos/bradesco.svg", alt: "Bradesco" },
  { src: "/logos/inter.svg", alt: "Inter" },
];

const faqs = [
  {
    q: "É seguro conectar minha conta bancária?",
    a: "Sim, usamos criptografia de nível bancário e não armazenamos suas credenciais.",
  },
  {
    q: "Como são gerados os alertas em tempo real?",
    a: "Você recebe notificações instantâneas via app sempre que houver movimentações.",
  },
  {
    q: "Há versão mobile?",
    a: "Sim, o TechFinance está disponível para iOS e Android.",
  },
];

export default function Home() {
  return (
    <div className="bg-finance-bg min-h-screen text-gray-900">
      <section className="relative py-24 px-6">
        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 min-h-[400px]">
          <div className="flex-1 space-y-14 text-left md:text-left">
              <span className="text-[15px] bg-finance-primary-light text-white font-bold py-1 px-3 rounded-full inline-block mb-8   ">
               liberte-se das correntes financeiras
              </span>

        
            <h1 className="text-5xl  font-extrabold leading-tight ">
              Sua{" "}
              <span className="font-bold text-finance-primary-dark">
                Liberdade
              </span>{" "}
              financeira a um clique de distância
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
              Centralize todas as suas contas e cartões em um dashboard
              intuitivo e seguro.
              <div className="flex items-center px-1 my-4">
                <svg
                  className="w-4 h-4 text-yellow-300 me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <p className="ms-2 text-sm font-bold text-gray-900 ">4.95</p>
                <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full "></span>
                <a
                  href="#"
                  className="text-sm font-medium text-gray-900 underline hover:no-underline "
                >
                  73 reviews
                </a>
              </div>
            </p>

            <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-0 sm:space-y-0 justify-center md:justify-start">
              <button className="btn-gradient px-8 py-4 rounded-xl font-semibold hover:cursor-pointer">
                Começar Grátis
              </button>
              <button className="hover:cursor-pointer px-8 py-3 bg-white text-gradient-primary border-2 border-primary rounded-xl hover:bg-primary hover:text-white transition">
                Saiba mais
              </button>
            </div>
          </div>

          <div className="flex-[1.4] flex justify-center w-full">
            <img
              src="/1.svg"
              alt="Usuarios usando o app"
              className="w-max h-max object-contain  "
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gradient-primary">
            Funcionalidades principais
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white border border-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <img
                  src={f.icon}
                  alt={f.title}
                  className="mx-auto mb-6 w-12 h-12"
                />
                <h3 className="font-semibold text-xl mb-2 text-gradient-accent">
                  {f.title}
                </h3>
                <p className="text-gray-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 bg-finance-bg">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gradient-primary">
            Integração com os principais bancos
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {banks.map((b) => (
              <img
                key={b.alt}
                src={b.src}
                alt={b.alt}
                className="h-12 filter grayscale opacity-80 hover:filter-none hover:opacity-100 transition"
              />
            ))}
          </div>
          <p className="mt-6 text-gray-600">
            Conecte-se com segurança a mais de 50 instituições financeiras.
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gradient-primary">
            Planos para seu uso
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Grátis",
                price: "R$0",
                features: [
                  "Dashboard básico",
                  "Conexão 1 banco",
                  "Suporte comum",
                ],
              },
              {
                name: "Pro",
                price: "R$29/mês",
                features: [
                  "Dashboard avançado",
                  "Conexão 5 bancos",
                  "Suporte prioritário",
                ],
              },
              {
                name: "Enterprise",
                price: "Sob consulta",
                features: [
                  "Customizações",
                  "Integrações ilimitadas",
                  "Suporte VIP",
                ],
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className="bg-finance-bg rounded-2xl p-8 border border-gray-100 shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-4 text-gradient-accent">
                  {plan.name}
                </h3>
                <p className="text-4xl font-bold mb-6 text-gradient-primary">
                  {plan.price}
                </p>
                <ul className="mb-6 space-y-2">
                  {plan.features.map((f, i) => (
                    <li key={i} className="text-sm text-gray-700">
                      • {f}
                    </li>
                  ))}
                </ul>
                <button className="btn-gradient px-6 py-2 font-semibold rounded-lg">
                  Escolher
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-gradient-primary">
            Perguntas Frequentes
          </h2>
          <div className="space-y-4">
            {faqs.map((item, idx) => (
              <details
                key={idx}
                className="p-4 border rounded-lg bg-finance-bg"
              >
                <summary className="font-medium cursor-pointer">
                  {item.q}
                </summary>
                <p className="mt-2 text-gray-700">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-finance-bg text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-primary">
          Pronto para transformar sua vida financeira?
        </h2>
        <p className="text-lg mb-10 text-gray-700">
          Experimente o TechFinance grátis por 7 dias e veja a diferença.
        </p>
        <button className="btn-gradient px-10 py-4 font-semibold rounded-2xl shadow-xl">
          Criar conta grátis
        </button>
      </section>
    </div>
  );
}
