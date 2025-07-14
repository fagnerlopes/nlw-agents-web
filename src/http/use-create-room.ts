import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateRoomRequest } from "./types/create-room-request";
import type { CreateRoomResponse } from "./types/create-room-response";
import { fetchWithAuth } from "./fetch-with-auth";

export function useCreateRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateRoomRequest) => {
      const response = await fetchWithAuth("http://localhost:3333/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result: CreateRoomResponse = await response.json();
      return result;
    },
    onSuccess: () => {
      // Invalidate the 'get-rooms' query to refresh the room list
      // after a new room has been created.
      // This ensures that the UI reflects the latest data.
      queryClient.invalidateQueries({
        queryKey: ["get-rooms"],
      });
    },
  });
}
