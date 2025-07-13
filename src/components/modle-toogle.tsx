import { Contrast } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  function toogleTheme() {
    if (theme === "dark") {
      setTheme("light");
    }

    if (theme === "light") {
      setTheme("dark");
    }
  }

  return (
    <Button size="icon" onClick={toogleTheme} title="Dark/Light">
      <Contrast />
    </Button>
  );
}
