import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { dayjs } from "@/lib/dayjs";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function CreateRoom() {

  type GetRoomsAPIResponse = Array<{
    id: string;
    name: string;
    questionsCount: number;
    createdAt: string;
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
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 items-start gap-8">
          <div />
          
          <Card>
            <CardHeader>
              <CardTitle>
                Salas recentes
              </CardTitle>
              <CardDescription>
                Acesso rápido as salas criadas recentemente
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {data?.map(room => {
                console.log("CREATED: ", room.createdAt)

                return (
                  <Link 
                    key={room.id} 
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent"
                    to={`/rooms/${room.id}`}
                  >
                    <div className="flex-1 flex flex-col gap-1">
                      <h3 className="font-medium">{room.name}</h3>

                      <div className="flex items-center ga-2">
                        <Badge variant="secondary" className="font-light text-xs">                         
                          {dayjs(room.createdAt).fromNow().replace('há', 'Há').replace('em', 'Em')}
                        </Badge>
                        <Badge variant="secondary" className="font-light text-xs">
                          {room.questionsCount} pergunta(s)
                        </Badge>
                      </div>
                    </div>
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      Entrar
                      <ArrowRight className="size-3"/>
                    </span>
                  </Link>
                )
              })}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}