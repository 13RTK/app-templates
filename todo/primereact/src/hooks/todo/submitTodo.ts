import { UseMutateFunction } from "@tanstack/react-query";
import { Todo, TodoDetail } from "../../types/Todo.ts";
import { ToastSeverity } from "../../types/ToastSeverity.ts";

export function useSubmitTodo(
  buttonLabel: string,
  addTodo: UseMutateFunction<any, Error, TodoDetail, unknown>,
  updateTodo: UseMutateFunction<
    void,
    Error,
    {
      todoId: number;
      updateTodo: {
        title?: string;
        tag?: string;
        content?: string;
      };
    },
    unknown
  >,
  showToast: (severity: ToastSeverity, summary: string) => void,
  currentTodo: Todo | null,
  setDialogVisible: (loading: boolean) => void,
  setCurrentTodoStartIndex: (startIndex: number) => void
) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // Add todo
    if (buttonLabel.toLowerCase() === "add") {
      addTodo(
        {
          id: Date.now(),
          title: formData.get("title") as string,
          tag: formData.get("tag") as string,
          content: formData.get("content") as string,
        },
        {
          onSuccess: () => {
            setCurrentTodoStartIndex(0);
            showToast("success", "Successfully added todo");
          },
        }
      );

      // Update todo
    } else {
      if (currentTodo) {
        updateTodo(
          {
            todoId: currentTodo?.id,
            updateTodo: {
              title: formData.get("title") as string,
              tag: formData.get("tag") as string,
              content: formData.get("content") as string,
            },
          },
          {
            onSuccess: () => {
              showToast("success", "Successfully updated todo");
            },
          }
        );
      }
    }
    setDialogVisible(false);
  }

  return {
    handleSubmit,
  };
}
