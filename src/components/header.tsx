import { Link, useLocation, useNavigate } from "react-router-dom";
import { ModeToggle } from "./modle-toogle";
import { Button } from "./ui/button";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const hideButtonsOnRoutes = ["/"];

  console.log(location.pathname);

  const isHome = hideButtonsOnRoutes.includes(location.pathname);

  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-foreground">
          LetMeAsk
        </Link>
        <div className="flex gap-2">
          {isHome && <Button onClick={() => navigate("/login")}>Entrar</Button>}

          {isHome && (
            <Button className="bg-purple-500 text-white font-semibold">
              Comece grátis
            </Button>
          )}

          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
