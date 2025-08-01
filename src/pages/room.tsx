import { ArrowLeft, Radio } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { QuestionForm } from "@/components/question-form";
import { QuestionList } from "@/components/question-list";
import { useAuthStore } from "@/store/use-auth-store";

type RoomParams = {
  roomId: string;
};

export function Room() {
  const params = useParams<RoomParams>();
  const { user } = useAuthStore();
  const isAdmin = user?.role === "admin";

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  return (
    <>
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <Link to="/rooms">
            <Button variant="outline">
              <ArrowLeft className="mr-2 size-4" />
              Voltar ao Início
            </Button>
          </Link>
          <Link to={`/room/${params.roomId}/audio`}>
            {isAdmin &&<Button className="flex items-center gap-2" variant="secondary">
              <Radio className="size-4" />
              Gravar Áudio
            </Button>}
          </Link>
        </div>
        <h1 className="mb-2 font-bold text-3xl text-foreground">
          Sala de Perguntas
        </h1>
        <p className="text-muted-foreground">
          Faça perguntas e receba respostas com IA
        </p>
      </div>

      <div className="mb-8">
        <QuestionForm roomId={params.roomId} />
      </div>

      <QuestionList roomId={params.roomId} />
    </>
  );
}
