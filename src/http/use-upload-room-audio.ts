import { useMutation } from "@tanstack/react-query";
import { fetchWithAuth } from "./fetch-with-auth";

export function useUploadRoomAudio(roomId?: string) {
  return useMutation({
    mutationFn: async (audio: Blob) => {
      if (!roomId) throw new Error("roomId é obrigatório");
      const formData = new FormData();
      formData.append("file", audio, "audio.webm");
      const response = await fetchWithAuth(
        `http://localhost:3333/rooms/${roomId}/audio`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      return result;
    },
  });
}
