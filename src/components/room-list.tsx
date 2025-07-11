import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { dayjs } from "@/lib/dayjs";
import { ArrowRight } from "lucide-react";
import { useRooms } from "@/http/use-rooms";

export function RoomList() {
  const { data, isLoading } = useRooms()

  return (
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
        {isLoading && (
                <div className="flex items-center justify-center h-32">
                  <span>Carregando...</span>
                </div>
              )}
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
  )
}