import { useQuery } from "@tanstack/react-query";
import type { GetRoomsResponse } from "./types/get-rooms-response";
import { fetchWithAuth } from "./fetch-with-auth";

export function useRooms() {
  return useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const response = await fetchWithAuth("http://localhost:3333/rooms");
      const result: GetRoomsResponse = await response.json();
      return result;
    },
  });
}
