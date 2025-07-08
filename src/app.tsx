import { Routes, Route, BrowserRouter } from "react-router-dom";
import { CreateRoom } from "./pages/create-room";
import { Room } from "./pages/room";

export function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<CreateRoom />} index/>
          <Route path="/room" element={<Room />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
