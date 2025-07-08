import { Routes, Route, BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CreateRoom } from "./pages/create-room";
import { Room } from "./pages/room";

const queryClient = new QueryClient();

export function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<CreateRoom />} index/>
            <Route path="/room/:roomId" element={<Room />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  )
}
