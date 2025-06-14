import { useSetAtom } from "jotai";
import {
  deleteTodoById,
  getTodoContentById,
  getTodos,
} from "../../service/apiTodo";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { dialogVisibleAtom } from "../../atoms/dialogVisible.ts";
import { currentEditTodoInfoAtom, currentTodoAtom } from "../../atoms/todo.ts";
import { Todo } from "../../types/Todo.ts";

export function useTodoList(
  todoQueryClient: QueryClient,
  setButtonLabel: (label: string) => void
) {
  const {
    data: todos,
    isLoading: isTodoLoading,
    isError: isTodoLoadError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const { mutate: deleteTodo } = useMutation({
    mutationFn: deleteTodoById,
    onSuccess: () => {
      todoQueryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const setDialogVisible = useSetAtom(dialogVisibleAtom);
  const setCurrentTodo = useSetAtom(currentTodoAtom);
  const setEditTodoInfo = useSetAtom(currentEditTodoInfoAtom);

  async function handleClickEditTodo(todo?: Todo) {
    if (!todo) {
      setButtonLabel("Add");
      setDialogVisible(true);
      setCurrentTodo(null);

      setEditTodoInfo({
        title: "",
        tag: "",
        content: "",
      });
      return;
    }

    const todoContent = await getTodoContentById(todo.id);

    setEditTodoInfo({
      title: todo.title,
      tag: todo.tag,
      content: todoContent,
    });
    setButtonLabel("Update");
    setCurrentTodo(todo);
    setDialogVisible(true);
  }

  return {
    todos,
    deleteTodo,
    isTodoLoadError,
    isTodoLoading,
    handleClickEditTodo,
  };
}
