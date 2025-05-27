import { useAuth } from "@/app/contexts/auth/auth-context";
import { useState } from "react";

const Navbar = () => {
  const { user, logout,loading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [blogMenuOpen, setBlogMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <nav className="bg-finance-bg py-4 px-6">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between relative">
        {/* Logo */}
        <div className="flex items-center space-x-3 bg-white py-1 px-3 rounded-full">
          <div className="py-2 rounded-full">
            <img src="/tech.jpeg" alt="Logo" className="rounded-full h-8 w-8" />
          </div>
          <span className="text-xl font-bold text-gray-900">TechFinance</span>
        </div>

        {/* Menu desktop */}
        <div className="hidden lg:flex bg-white rounded-full px-8 py-4 shadow-sm items-center space-x-6 text-gray-700 font-medium text-base">
          <a href="/" className="text-black font-semibold">
            Home
          </a>
          <a href="#" className="hover:text-finance-primary-dark">
            Sobre
          </a>
          <a href="#" className="hover:text-finance-primary-dark">
            Funcionalidades
          </a>
          <a href="#" className="hover:text-finance-primary-dark">
            Reviews
          </a>
          {/* Blog Dropdown */}
          <div className="relative">
            <button
              onClick={() => setBlogMenuOpen(!blogMenuOpen)}
              className="hover:text-finance-primary-dark flex items-center gap-1"
            >
              Blog
            </button>

            {blogMenuOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 z-50 w-[90vw] max-w-screen-md bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm text-gray-700">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">
                      Últimos Posts 🥴
                    </h3>
                    <p className="text-gray-500">Leia nossos últimos posts </p>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">
                      Sub Menu Title
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="hover:underline">
                          Overview
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:underline">
                          Modifiers
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:underline">
                          Columns
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:underline">
                          Layout
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="hidden md:block">
                    <h3 className="text-base font-semibold text-gray-900 mb-2">
                      Sub Menu Title
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="hover:underline">
                          Overview
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:underline">
                          Modifiers
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:underline">
                          Columns
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:underline">
                          Layout
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <hr className="my-4 border-gray-200" />
                <p className="text-gray-900 font-medium">Stay up to date!</p>
              </div>
            )}
          </div>
        </div>

        {/* Menu mobile toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-700 hover:text-black focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Avatar ou login */}
        <div className="ml-4 relative">
          {user && !loading ? (
            <>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-finance-primary text-white font-bold hover:cursor-pointer"
              >
                {getInitials(user.name)}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                  <ul className="py-1">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sair
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <a
              href="/login"
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 hover:cursor-pointer"
            >
              Começe agora
            </a>
          )}
        </div>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 bg-white rounded-xl shadow px-6 py-4 space-y-3 text-gray-800 font-medium">
          <a href="#" className="block">
            Overview
          </a>
          <a href="#" className="block">
            Activity
          </a>
          <a href="#" className="block">
            Manage
          </a>
          <a href="#" className="block">
            Program
          </a>
          <a href="#" className="block">
            Folders
          </a>
          <a href="#" className="block">
            Documents
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
