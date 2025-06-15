import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../../service/apiTodo.ts";
import { useAtomValue } from "jotai";
import { currentPageAtom } from "../../atoms/pagination.ts";

export function useGetTodo(searchText: string) {
  const currentPage = useAtomValue(currentPageAtom);

  const {
    data: todos,
    isLoading: isTodoGetting,
    isError: isTodoLoadError,
  } = useQuery({
    queryKey: ["todos", currentPage],
    queryFn: () => getTodos(currentPage, searchText),
  });

  return {
    todos,
    isTodoGetting,
    isTodoLoadError,
  };
}
