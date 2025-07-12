import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

type RoomParams = {
  roomId: string;
};

const isRecordingSupported = () => {
  return !!(
    navigator.mediaDevices &&
    typeof navigator.mediaDevices.getUserMedia === "function" &&
    typeof window.MediaRecorder === "function"
  );
};

export function RecordRoomAudio() {
  const params = useParams<RoomParams>();

  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);

  function stopRecording() {
    if (recorder.current && recorder.current.state !== "inactive") {
      recorder.current.stop();
      setIsRecording(false);
    } else {
      alert("Nenhuma gravação em andamento.");
      return;
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData();

    formData.append("file", audio, "audio.webm");

    const response = await fetch(
      `http://localhost:3333/rooms/${params.roomId}/audio`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    console.log("Resposta do servidor:", result);
  }

  async function startRecording() {
    if (!isRecordingSupported()) {
      alert("Gravação de áudio não é suportada neste navegador.");
      return;
    }

    setIsRecording(true);

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    });

    recorder.current = new MediaRecorder(audio, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 64_000,
    });

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data);
        console.log("Dados de áudio gravados:", event.data);
      }
    };

    recorder.current.onstart = () => {
      console.log("Gravação iniciada");
    };

    recorder.current.onstop = () => {
      console.log("Gravação parada");
      setIsRecording(false);
    };

    recorder.current.start();
  }

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="bg-background text-foreground min-h-screen px-4 py-8">
      <Header />
      <div className="mx-auto max-w-4xl">
        <div className="h-screen flex items-center justify-center gap-3 flex-col">
          {isRecording ? (
            <Button onClick={stopRecording} className="w-full max-w-md">
              Parar gravação
            </Button>
          ) : (
            <Button onClick={startRecording} className="w-full max-w-md">
              Gravar áudio
            </Button>
          )}

          {isRecording ? <p>Gravando...</p> : <p>Pausado</p>}
        </div>
      </div>
    </div>
  );
}
