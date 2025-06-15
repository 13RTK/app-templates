import { QueryClient } from "@tanstack/react-query";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import {
  currentEditTodoInfoAtom,
  currentTodoAtom,
  isTodoLoadingAtom,
} from "../../atoms/todo.ts";
import { dialogVisibleAtom } from "../../atoms/dialogVisible.ts";

import { ToastSeverity } from "../../types/ToastSeverity.ts";
import { useAddTodo } from "./addTodo.ts";
import { useUpdateTodo } from "./updateTodo.ts";
import { useSubmitTodo } from "./submitTodo.ts";

export function useTodoDialog(
  todoQueryClient: QueryClient,
  buttonLabel: string,
  showToast: (severity: ToastSeverity, summary: string) => void,
  setCurrentTodoStartIndex: (startIndex: number) => void
) {
  const [currentEditTodoInfo, setCurrentEditTodoInfo] = useAtom(
    currentEditTodoInfoAtom
  );
  const currentTodo = useAtomValue(currentTodoAtom);
  const [dialogVisible, setDialogVisible] = useAtom(dialogVisibleAtom);
  const setIsTodoLoading = useSetAtom(isTodoLoadingAtom);

  const { addTodo } = useAddTodo(todoQueryClient, setIsTodoLoading);

  const { updateTodo } = useUpdateTodo(todoQueryClient, setIsTodoLoading);

  const { handleSubmit } = useSubmitTodo(
    buttonLabel,
    addTodo,
    updateTodo,
    showToast,
    currentTodo,
    setDialogVisible,
    setCurrentTodoStartIndex
  );

  return {
    currentEditTodoInfo,
    setCurrentEditTodoInfo,
    currentTodo,
    dialogVisible,
    setDialogVisible,
    handleSubmit,
  };
}
