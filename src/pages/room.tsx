import { Link, Navigate, useParams } from "react-router-dom";

type RoomParams = {
  roomId: string;
}

export function Room() {
  const params = useParams<RoomParams>();

  if (!params.roomId) {
    return <Navigate replace to="/" />
  }

  return (
    <div>
      <h1>Room Details</h1>

      <p>Room ID: {params.roomId}</p>



      <Link to="/">Go to Create Room</Link>
    </div>
  )
}