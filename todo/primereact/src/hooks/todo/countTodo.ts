import { useQuery } from "@tanstack/react-query";
import { getTodoCount } from "../../service/apiTodo.ts";

export function useCountTodo(searchText: string) {
  const { data: todoCount, isLoading: isTodoCountLoading } = useQuery({
    queryKey: ["todoCount"],
    queryFn: () => getTodoCount(searchText),
  });

  return {
    todoCount,
    isTodoCountLoading,
  };
}
