import { useLoading } from "@/contexts/loading-context";
import { Progress } from "@/components/ui/progress";

export function LoadingScreen() {
  const { loading } = useLoading();

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      <p className="text-sm mb-4">Carregando aplicação...</p>
      <div className="w-1/2 max-w-sm">
        <Progress value={loading} />
      </div>
    </div>
  );
}
