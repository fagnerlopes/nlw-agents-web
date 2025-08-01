import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useUploadRoomAudio } from "../http/use-upload-room-audio";

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
  const uploadAudioMutation = useUploadRoomAudio(params.roomId);

  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  function createRecorder(stream: MediaStream) {
    recorder.current = new MediaRecorder(stream, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 64_000,
    });

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudioMutation.mutate(event.data);
      }
    };

    recorder.current.onstart = () => {
      console.log("Gravação iniciada");
    };

    recorder.current.onstop = () => {
      console.log("Gravação parada");
    };

    recorder.current.start();
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

    createRecorder(audio);

    intervalRef.current = setInterval(() => {
      recorder.current?.stop();

      createRecorder(audio);
    }, 10000);
  }

  function stopRecording() {
    setIsRecording(false);

    if (recorder.current && recorder.current.state !== "inactive") {
      recorder.current.stop();
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }

  // uploadAudio removido, agora usando o hook useUploadRoomAudio

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
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
