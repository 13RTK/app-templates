import { QueryClient, useMutation } from "@tanstack/react-query";
import { updateTodo as updateTodoApi } from "../../service/apiTodo.ts";

export function useUpdateTodo(
  todoQueryClient: QueryClient,
  setIsTodoLoading: (loading: boolean) => void
) {
  const { mutate: updateTodo } = useMutation({
    mutationFn: async ({
      todoId,
      updateTodo,
    }: {
      todoId: number;
      updateTodo: {
        title?: string;
        tag?: string;
        content?: string;
      };
    }) => {
      setIsTodoLoading(true);
      await updateTodoApi({
        id: todoId,
        ...(updateTodo.title && { title: updateTodo.title }),
        ...(updateTodo.tag && { tag: updateTodo.tag }),
        ...(updateTodo.content && { content: updateTodo.content }),
      });
    },
    onSuccess: () => {
      setIsTodoLoading(false);
      todoQueryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return { updateTodo };
}
