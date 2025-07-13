import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { Footer } from "./footer";

export function Layout() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <Header />

      <main className="container flex-grow mx-auto max-w-4xl px-4 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
