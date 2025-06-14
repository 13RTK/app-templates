import { QueryClient, useMutation } from "@tanstack/react-query";
import { useAtom, useAtomValue } from "jotai";

import { currentEditTodoInfoAtom, currentTodoAtom } from "../../atoms/todo.ts";
import { dialogVisibleAtom } from "../../atoms/dialogVisible.ts";

import {
  addTodo as addTodoApi,
  updateTodo as updateTodoApi,
} from "../../service/apiTodo.ts";
import { ToastSeverity } from "../../types/ToastSeverity.ts";

export function useTodoDialog(
  todoQueryClient: QueryClient,
  buttonLabel: string,
  showToast: (severity: ToastSeverity, summary: string) => void
) {
  const [currentEditTodoInfo, setCurrentEditTodoInfo] = useAtom(
    currentEditTodoInfoAtom
  );
  const currentTodo = useAtomValue(currentTodoAtom);
  const [dialogVisible, setDialogVisible] = useAtom(dialogVisibleAtom);

  const { mutate: addTodo } = useMutation({
    mutationFn: addTodoApi,
    onSuccess: () => {
      todoQueryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

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
    }) =>
      await updateTodoApi({
        id: todoId,
        ...(updateTodo.title && { title: updateTodo.title }),
        ...(updateTodo.tag && { tag: updateTodo.tag }),
        ...(updateTodo.content && { content: updateTodo.content }),
      }),
    onSuccess: () => {
      todoQueryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // Add todo
    if (buttonLabel.toLowerCase() === "add") {
      addTodo({
        id: Date.now(),
        title: formData.get("title") as string,
        tag: formData.get("tag") as string,
        content: formData.get("content") as string,
      });

      showToast("success", "Successfully added todo");

      // Update todo
    } else {
      if (currentTodo) {
        updateTodo({
          todoId: currentTodo?.id,
          updateTodo: {
            title: formData.get("title") as string,
            tag: formData.get("tag") as string,
            content: formData.get("content") as string,
          },
        });

        showToast("success", "Successfully updated todo");
      }
    }
    setDialogVisible(false);
  }

  return {
    currentEditTodoInfo,
    setCurrentEditTodoInfo,
    currentTodo,
    dialogVisible,
    setDialogVisible,
    handleSubmit,
  };
}
