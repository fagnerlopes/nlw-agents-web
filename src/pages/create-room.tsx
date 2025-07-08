import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export function CreateRoom() {

  type GetRoomsAPIResponse = Array<{
    id: string;
    name: string;
  }>;

  const { data, isLoading } = useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms');
      const result: GetRoomsAPIResponse = await response.json();
      return result;
    }
  });

  return (
    <div>
      <h1>Create Room</h1>

      {isLoading && <p>Loading...</p>}      
      <div className="flex flex-col gap-1">
        {
          data?.map((room) => {
            return <Link key={room.id} to={`/room/${room.id}`}>{room.name}</Link>
          })
        }
      </div>
    </div>
  )
}