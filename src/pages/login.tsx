import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/http/use-login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod/v4";

let isSending = false;

const loginSchema = z.object({
  email: z.email({ error: "Email inválido" }),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type loginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const { mutateAsync: loginAuth } = useLogin();
  const navigate = useNavigate();

  const loginForm = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLogin({ email, password }: loginFormData) {
    isSending = true;

    await loginAuth({
      email,
      password,
    });

    loginForm.reset();

    isSending = false;

    navigate("/create-room");
  }

  return (
    <div className="bg-background text-foreground min-h-screen flex items-center justify-center">
      <div className="mx-auto sm:max-w-4xl md:min-w-xl">
        <Card>
          <CardHeader>
            <CardTitle>LetMeAsk</CardTitle>
            <CardDescription>Acesse sua conta</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(handleLogin)}
                className="flex flex-col gap-4"
              >
                <FormField
                  name="email"
                  control={loginForm.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Seu e-mail..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  name="password"
                  control={loginForm.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Sua senha..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <Button type="submit" className="w-full" disabled={isSending}>
                  {isSending ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
