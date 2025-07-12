import { Routes, Route, BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CreateRoom } from "./pages/create-room";
import { Room } from "./pages/room";
import { LoadingProvider, useLoading } from "@/contexts/loading-context";
import { LoadingScreen } from "@/components/loading-screen";

const queryClient = new QueryClient();

function InnerApp() {
  const { loading } = useLoading();

  if (loading < 100) return <LoadingScreen />;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CreateRoom />} index />
        <Route path="/room/:roomId" element={<Room />} />
      </Routes>
    </BrowserRouter>
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>
        <InnerApp />
      </LoadingProvider>
    </QueryClientProvider>
  );
}
