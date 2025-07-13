import { Routes, Route, BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CreateRoom } from "./pages/create-room";
import { Room } from "./pages/room";
import { LoadingProvider, useLoading } from "@/providers/loading-provider";
import { LoadingScreen } from "@/components/loading-screen";
import { ThemeProvider } from "@/providers/theme-provider";
import { RecordRoomAudio } from "./pages/record-room-audio";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { Layout } from "./components/layout";

const queryClient = new QueryClient();

function InnerApp() {
  const { loading } = useLoading();

  if (loading < 100) return <LoadingScreen />;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<Home />} index />
          <Route path="/create-room" element={<CreateRoom />} />
          <Route path="/room/:roomId" element={<Room />} />
          <Route path="/room/:roomId/audio" element={<RecordRoomAudio />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <LoadingProvider>
          <InnerApp />
        </LoadingProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
