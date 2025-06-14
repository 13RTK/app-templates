import { useAtomValue, useSetAtom } from "jotai";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import {
  deleteTodoById,
  getTodoContentById as getTodoContentByIdApi,
  getTodos,
} from "../../service/apiTodo";

import { dialogVisibleAtom } from "../../atoms/dialogVisible.ts";
import {
  currentEditTodoInfoAtom,
  currentTodoAtom,
  isTodoLoadingAtom,
} from "../../atoms/todo.ts";
import { Todo } from "../../types/Todo.ts";
import { ToastSeverity } from "../../types/ToastSeverity.ts";
import { currentTodoStartIndexAtom } from "../../atoms/pagination.ts";

export function useTodoList(
  todoQueryClient: QueryClient,
  setButtonLabel: (label: string) => void,
  showToast: (severity: ToastSeverity, summary: string) => void
) {
  const currentTodoStartIndex = useAtomValue(currentTodoStartIndexAtom);
  const currentPage =
    Math.trunc(currentTodoStartIndex / import.meta.env.VITE_PAGE_SIZE) + 1;

  // get todos
  const {
    data: todos,
    isLoading: isTodoGetting,
    isError: isTodoLoadError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: () => getTodos(currentPage),
  });

  // delete todo
  const { mutate: deleteTodo, isPending: isDeleting } = useMutation({
    mutationFn: deleteTodoById,
    onSuccess: () => {
      todoQueryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // get todo content
  const { mutate: getTodoContentById, isPending: isTodoContentGetting } =
    useMutation({
      mutationFn: getTodoContentByIdApi,
    });

  const setIsTodoLoading = useSetAtom(isTodoLoadingAtom);

  useEffect(() => {
    if (isTodoGetting || isDeleting) {
      setIsTodoLoading(true);
      return;
    }

    setIsTodoLoading(false);
  }, [isTodoGetting, isDeleting]);

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

    getTodoContentById(todo.id, {
      onSuccess(todoContent) {
        setEditTodoInfo({
          title: todo.title,
          tag: todo.tag,
          content: todoContent,
        });
        setButtonLabel("Update");
        setCurrentTodo(todo);

        showToast("success", "Successfully loaded todo");

        setDialogVisible(true);
      },
    });
  }

  return {
    todos,
    deleteTodo,
    isTodoLoadError,
    handleClickEditTodo,
    isTodoContentGetting,
  };
}
