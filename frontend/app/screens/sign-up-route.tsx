import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../contexts/auth-context";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!name || !email || !password) {
      setError("Por favor, preencha todos os campos.");
      setLoading(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, insira um email válido.");
      setLoading(false);
      return;
    }
    try {
      await signUp(email, password, name);
      navigate("/dashboard");
    } catch (err) {
      console.error("Sign up failed:", err);
      setError(err instanceof Error ? err.message : "Erro ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-finance-bg p-4 sm:p-6 lg:p-8">
      <div className=" max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="hidden md:flex items-center justify-center p-8 lg:p-12 bg-white h-full">
          <img
            src="./login-sigin.svg"
            alt="Ilustração de cadastro"
            className=" object-cover"
          />
        </div>
        <div className="flex flex-col justify-center p-10 sm:p-12 lg:p-16">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Crie sua conta no
            </h2>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-finance-primary">
              TechFinance
            </h1>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Nome
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                className="w-full px-4 py-3.5 rounded-lg bg-gray-50 border border-gray-200
                           focus:bg-white focus:ring-2 focus:ring-finance-primary-light
                           focus:border-transparent focus:outline-none transition-all duration-150"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplo@email.com"
                className="w-full px-4 py-3.5 rounded-lg bg-gray-50 border border-gray-200
                           focus:bg-white focus:ring-2 focus:ring-finance-primary-light
                           focus:border-transparent focus:outline-none transition-all duration-150"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Crie uma senha (mín. 6 caracteres)"
                className="w-full px-4 py-3.5 rounded-lg bg-gray-50 border border-gray-200
                           focus:bg-white focus:ring-2 focus:ring-finance-primary-light
                           focus:border-transparent focus:outline-none transition-all duration-150"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: 'var(--color-finance-primary)' }}
              className="w-full text-white font-semibold py-3.5 px-6 rounded-lg
                         hover:opacity-90 transition-opacity duration-200
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-finance-primary-light
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                "Criar conta"
              )}
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-gray-600">
            Já tem uma conta?{" "}
            <Link
              to="/login"
              className="font-medium text-finance-primary hover:text-finance-primary-dark hover:underline"
            >
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}