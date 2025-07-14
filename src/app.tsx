import { Routes, Route, BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CreateRoom } from "./pages/create-room";
import { Room } from "./pages/room";
import { LoadingProvider } from "@/providers/loading-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { RecordRoomAudio } from "./pages/record-room-audio";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { Layout } from "./components/layout";
import { AuthProvider } from "./providers/auth-provider";
import { ProtectedRoute } from "./auth/protected-route";

const queryClient = new QueryClient();

function InnerApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<Home />} index />

          {/* Admin and Member Routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin", "member"]} />}>
            <Route path="/room/:roomId" element={<Room />} />
            
          </Route>

          {/* Admin Only Routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/room/:roomId/audio" element={<RecordRoomAudio />} />
            <Route path="/create-room" element={<CreateRoom />} />
          </Route>
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
          <AuthProvider>
            <InnerApp />
          </AuthProvider>
        </LoadingProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
