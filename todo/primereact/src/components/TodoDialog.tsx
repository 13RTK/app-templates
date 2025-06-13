import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Todo, TodoDetail } from "../types/Todo";
import { ToastSeverity } from "../types/ToastSeverity";

import {
  addTodo as addTodoApi,
  updateTodo as updateTodoApi,
} from "../service/apiTodo.ts";
import { useAtom, useAtomValue } from "jotai";
import { currentEditTodoInfoAtom, currentTodoAtom } from "../atoms/todo.ts";
import { dialogVisibleAtom } from "../atoms/dialogVisible.ts";

function TodoDialog({
  buttonLabel,
  showToast,
  todoQueryClient,
}: {
  buttonLabel: string;
  showToast: (severity: ToastSeverity, summary: string) => void;
  todoQueryClient: QueryClient;
}) {
  const [currentEditTodoInfo, setCurrentEditTodoInfo] = useAtom(
    currentEditTodoInfoAtom
  );
  const currentTodo = useAtomValue(currentTodoAtom);
  const [dialogVisible, setDialogVisible] = useAtom(dialogVisibleAtom);

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
        updateTodo(currentTodo?.id, {
          title: formData.get("title") as string,
          tag: formData.get("tag") as string,
          content: formData.get("content") as string,
        });

        showToast("success", "Successfully updated todo");
      }
    }
    setDialogVisible(false);
  }

  const { mutate: addTodo, isPending: isAdding } = useMutation({
    mutationFn: addTodoApi,
    onSuccess: () => {
      todoQueryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  async function updateTodo(
    todoId: number,
    updateTodo: {
      title?: string;
      tag?: string;
      content?: string;
    }
  ) {
    const responseMessage = await updateTodoApi({
      id: todoId,
      ...(updateTodo.title && { title: updateTodo.title }),
      ...(updateTodo.tag && { tag: updateTodo.tag }),
      ...(updateTodo.content && { content: updateTodo.content }),
    });

    todoQueryClient.invalidateQueries({ queryKey: ["todos"] });
  }

  return (
    <Dialog
      visible={dialogVisible}
      onHide={() => {
        if (!dialogVisible) return;
        setDialogVisible(false);
      }}
      style={{ width: "50vw" }}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
    >
      <form
        className="card flex justify-content-center align-items-center flex-column gap-3"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-column gap-2">
          <label htmlFor="title">Title</label>
          <InputText
            placeholder="Input your todo title"
            className="p-inputtext-lg"
            value={currentEditTodoInfo.title}
            aria-describedby="title-help"
            id="title"
            onChange={(e) =>
              setCurrentEditTodoInfo({
                ...currentEditTodoInfo,
                title: e.target.value,
              })
            }
            name="title"
          />
        </div>

        <div className="flex flex-column gap-2">
          <label htmlFor="tag">Tag</label>
          <InputText
            placeholder="Input your todo tag"
            id="tag"
            aria-describedby="tag-help"
            className="p-inputtext-lg"
            value={currentEditTodoInfo.tag}
            onChange={(e) =>
              setCurrentEditTodoInfo({
                ...currentEditTodoInfo,
                tag: e.target.value,
              })
            }
            name="tag"
          />
        </div>

        <InputTextarea
          autoResize
          value={currentEditTodoInfo.content}
          onChange={(e) =>
            setCurrentEditTodoInfo({
              ...currentEditTodoInfo,
              content: e.target.value,
            })
          }
          rows={5}
          cols={30}
          placeholder="content"
          name="content"
        />

        <Button label={buttonLabel} />
      </form>
    </Dialog>
  );
}

export default TodoDialog;
