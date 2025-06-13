import { deleteTodoById, getTodos } from "../../service/apiTodo";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

export function useTodo(todoQueryClient: QueryClient) {
  const {
    data: todos,
    isLoading: isTodoLoading,
    isError: isTodoLoadError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const { mutate: deleteTodo, isPending: isDeleting } = useMutation({
    mutationFn: deleteTodoById,
    onSuccess: () => {
      todoQueryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return {
    todos,
    deleteTodo,
    isTodoLoadError,
    isTodoLoading,
  };
}
