import { UseMutateFunction } from "@tanstack/react-query";
import { ToastSeverity } from "../../types/ToastSeverity.ts";
import { Todo } from "../../types/Todo.ts";

export function useEditTodo(
  setButtonLabel: (label: string) => void,
  setDialogVisible: (loading: boolean) => void,
  setCurrentTodo: (todo: Todo | null) => void,
  setEditTodoInfo: (todo: {
    title: string;
    tag: string;
    content: string;
  }) => void,
  showToast: (severity: ToastSeverity, summary: string) => void,
  getTodoContentById: UseMutateFunction<string, Error, number, unknown>
) {
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
    handleClickEditTodo,
  };
}
