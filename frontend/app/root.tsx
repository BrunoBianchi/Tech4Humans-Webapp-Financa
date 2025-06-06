import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import NavbarComponent from "./components/ui/navbar-component";
import FooterComponent from "./components/ui/footer-component";
import { AuthProvider } from "./contexts/auth-context";
import { CookiesProvider } from "react-cookie";
import { ToastProvider } from "./contexts/toast-context";
import ToastContainer from "./components/ui/toast-component";
export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="br">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.7.2/css/all.css"
        />
      </head>
      <body>
        <ToastProvider>
          <CookiesProvider>
            <AuthProvider>
              <div className="flex flex-col min-h-screen">
                <NavbarComponent />

                <div className="flex-1">{children}</div>

                <FooterComponent />
              </div>
              <ToastContainer />
            </AuthProvider>
          </CookiesProvider>
        </ToastProvider>
        <ScrollRestoration />

        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
