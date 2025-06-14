import { QueryClient } from "@tanstack/react-query";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { ToastSeverity } from "../types/ToastSeverity";

import { useTodoDialog } from "../hooks/todo/todoDialog.ts";

type TodoDialogProps = {
  buttonLabel: string;
  showToast: (severity: ToastSeverity, summary: string) => void;
  todoQueryClient: QueryClient;
};

function TodoDialog({
  buttonLabel,
  showToast,
  todoQueryClient,
}: TodoDialogProps) {
  const {
    dialogVisible,
    setDialogVisible,
    handleSubmit,
    currentEditTodoInfo,
    setCurrentEditTodoInfo,
  } = useTodoDialog(todoQueryClient, buttonLabel, showToast);

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
