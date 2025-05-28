// src/app/components/shared/SideBarComponent.tsx

export default function SideBarComponent() {
  return (
    <aside
      className="
        hidden lg:flex flex-col items-center
        fixed left-4 top-1/4
         w-16
        bg-white bg-opacity-70
        rounded-4xl
        py-4
        space-y-6
        shadow-lg
      "
    >
      <a
        href="/dashboard"
        title="Dashboard"
        className="
          flex items-center justify-center

          w-10 h-10
          
          rounded-lg
          transition
        "
      >
        <i className="fa-solid fa-th-large hover:text-finance-primary-dark w-5 h-5"></i>
      </a>

      <a
        href="/orcamentos"
        title="Orçamentos"
        className="
          flex items-center justify-center
          w-10 h-10
          
          rounded-lg
          transition
        "
      >
        <i className="fa-regular fa-pig hover:text-finance-primary-dark w-5 h-5"></i>
      </a>

      <a
        href="/despesas"
        title="Despesas"
        className="
          flex items-center justify-center
          w-10 h-10
          
          rounded-lg
          transition
        "
      >
        <i className="fa-regular fa-notebook hover:text-finance-primary-dark w-5 h-5"></i>
      </a>

      <a
        href="/transacoes"
        title="Transações"
        className="
          flex items-center justify-center
          w-10 h-10
          
          rounded-lg
          transition
        "
      >
        <i className="fa-solid fa-list hover:text-finance-primary-dark w-5 h-5"></i>
      </a>

      <a
        href="/contatos"
        title="Contatos"
        className="
          flex items-center justify-center
          w-10 h-10
          
          rounded-lg
          transition
        "
      >
        <i className="fa-solid fa-users hover:text-finance-primary-dark w-5 h-5"></i>
      </a>
    </aside>
  );
}
