import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useCreateRoom } from "@/http/use-create-room";

let isSending = false;

const createRoomSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
});

type CreateRoomFormData = z.infer<typeof createRoomSchema>;

export function CreateRoomForm() {
  const { mutateAsync: createRoom } = useCreateRoom();

  const createRoomForm = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function handleCreateRoom({ name, description }: CreateRoomFormData) {
    isSending = true;

    await createRoom({
      name,
      description,
    });

    createRoomForm.reset();

    isSending = false;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar sala</CardTitle>
        <CardDescription>
          Crie uma nova sala para receber respostas da I.A.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...createRoomForm}>
          <form
            onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}
            className="flex flex-col gap-4"
          >
            <FormField
              name="name"
              control={createRoomForm.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite o nome da sala..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              name="description"
              control={createRoomForm.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button type="submit" className="w-full" disabled={isSending}>
              {isSending ? "Criando..." : "Criar sala"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
