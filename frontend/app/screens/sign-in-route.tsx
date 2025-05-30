export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eff1f3] px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="hidden md:flex items-center justify-center bg-[#eff1f3] p-10">
          <img
            src="./login-sigin.svg"
            alt="Ilustração de cadastro"
            className="w-full max-w-md"
          />
        </div>

        <div className="flex flex-col justify-center p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Bem-vindo ao TechFinance
          </h2>
          <p className="text-gray-500 mb-8">Crie sua conta para começar</p>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome
              </label>
              <input
                type="text"
                placeholder="Seu nome"
                className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-finance-primary-light focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Seu email"
                className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-finance-primary-light focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                placeholder="Crie uma senha"
                className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-finance-primary-light focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-finance-primary hover:bg-finance-primary-dark text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              Criar conta
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Já tem uma conta?{" "}
            <a href="/login" className="text-black hover:underline">
              Entrar
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
