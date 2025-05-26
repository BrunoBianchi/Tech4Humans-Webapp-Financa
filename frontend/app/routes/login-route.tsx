import { useState } from "react";
import { useAuth } from "../contexts/auth/auth-context";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password);
      navigate("/dashboard"); 
    } catch (error) {
        console.log(error)
      setError("Email ou senha incorretos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eff1f3] px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="hidden md:flex items-center justify-center bg-[#eff1f3] p-10">
          <img
            src="./login-sigin.svg"
            alt="Ilustração de login"
            className="w-full max-w-md"
          />
        </div>

        <div className="flex flex-col justify-center p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Bem-vindo de volta ao TechFinance
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu email"
                className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-finance-primary-light focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-finance-primary-light focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-finance-primary hover:bg-finance-primary-dark text-white font-semibold py-3 rounded-lg transition duration-300 disabled:opacity-50"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Não tem uma conta?{" "}
            <a href="/sign-in" className="text-black hover:underline">
              Criar
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}