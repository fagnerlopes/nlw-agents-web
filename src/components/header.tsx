import { Link } from "react-router-dom";
import { ModeToggle } from "./modle-toogle";

export function Header() {
  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-foreground">
          LetMeAsk
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
}
