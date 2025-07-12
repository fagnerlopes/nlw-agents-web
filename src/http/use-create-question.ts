import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateQuestionRequest } from "./types/create-question-request";
import type { CreateQuestionResponse } from "./types/create-question-response";
import type { GetRoomQuestionsResponse } from "./types/get-rooms-questions-response";

export function useCreateQuestion(roomId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateQuestionRequest) => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result: CreateQuestionResponse = await response.json();

      return result;
    },
    // Executa no momento que for disparada a chamada para a API
    onMutate({ question }) {
      // Otimista: Atualiza o cache local antes da resposta da API
      const questions = queryClient.getQueryData<GetRoomQuestionsResponse>([
        "get-questions",
        roomId,
      ]);

      const questionsArray = questions || [];

      const newQuestion = {
        id: crypto.randomUUID(),
        question,
        answer: null,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData<GetRoomQuestionsResponse>(
        ["get-questions", roomId],
        [newQuestion, ...questionsArray]
      );

      return { newQuestion, questions };
    },
    // Executa quando a chamada para a API for bem sucedida
    onSuccess: (data, _variables, context) => {
      queryClient.setQueryData<GetRoomQuestionsResponse>(
        ["get-questions", roomId],
        (questions) => {
          if (!questions) {
            return questions;
          }

          if (!context.newQuestion) {
            return questions;
          }

          return questions.map((question) => {
            if (question.id === context.newQuestion.id) {
              return {
                ...context.newQuestion,
                id: data.questionId,
                answer: data.answer,
              };
            }

            return question;
          });
        }
      );
    },
    // Executa quando a chamada para a API falhar
    onError: (_error, _variables, context) => {
      if (context?.questions) {
        queryClient.setQueryData<GetRoomQuestionsResponse>(
          ["get-questions", roomId],
          context.questions
        );
      }
    },

    // Exemplo mais simples de uso para atualizar o cache após a mutação
    // Isso pode ser usado para atualizar a lista de perguntas após uma nova pergunta ser criada
    // onSuccess: () => {
    //   // Invalidate the 'get-rooms' query to refresh the room list
    //   // after a new room has been created.
    //   // This ensures that the UI reflects the latest data.
    //   queryClient.invalidateQueries({
    //     queryKey: ["get-questions", roomId],
    //   });
    // },
  });
}
