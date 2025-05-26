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
import NavbarComponent from "./components/shared/navbar-component";
import { useEffect, useState } from "react";
import FooterComponent from "./components/shared/footer-component";
import { AuthProvider } from "./contexts/auth/auth-context";
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
  const [user,setUser] = useState<any | null>(null);
  const getUser = ()=>{
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }else {
      fetch(`http://localhost:5000/user/@me`, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        method: "GET"
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Failed to fetch user");
        })
        .then(response => {
          setUser(response);
        })
        .catch(error => {
          console.error('Error fetching user:', error);
          setUser(null);
        });
    }
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <Meta />
        <Links />
      </head>
      <body>
        <AuthProvider>
          <NavbarComponent />
          {children}
          <FooterComponent />
        </AuthProvider>
        <ScrollRestoration />
        <Scripts />
        <script src="../node_modules/flowbite/dist/flowbite.min.js"></script>
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
