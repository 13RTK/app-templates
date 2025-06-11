import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { classNames } from "primereact/utils";

import { useQueryClient } from "@tanstack/react-query";

import { useSetAtom } from "jotai";
import { dialogVisibleAtom } from "../atoms/dialogVisible.ts";
import { currentEditTodoInfoAtom, currentTodoAtom } from "../atoms/todo.ts";

import { Todo } from "../types/Todo";
import { ToastSeverity } from "../types/ToastSeverity";

import { useTodo } from "../hooks/todo.ts";
import { getTodoContentById } from "../service/apiTodo.ts";

export default function TodoList({
  showToast,
  searchText,
  setButtonLabel,
}: {
  showToast: (severity: ToastSeverity, summary: string) => void;
  searchText: string;
  setButtonLabel: (label: string) => void;
}) {
  const todoQueryClient = useQueryClient();
  const {
    todos,
    deleteTodo,
    addTodo,
    updateTodo,
    isTodoLoadError,
    isTodoLoading,
  } = useTodo(todoQueryClient);

  const setDialogVisible = useSetAtom(dialogVisibleAtom);
  const setCurrentTodo = useSetAtom(currentTodoAtom);
  const setEditTodoInfo = useSetAtom(currentEditTodoInfoAtom);

  async function handleClickEditTodo(todo?: Todo) {
    if (!todo) {
      setButtonLabel("Add");
      setDialogVisible(true);
      setCurrentTodo(null);
      // setTitle("");
      // setTag("");
      // setContent("");

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

  const searchedTodos =
    searchText === ""
      ? todos
      : todos?.filter((todo: Todo) =>
          todo.title.toLowerCase().includes(searchText.toLowerCase())
        );

  const itemTemplate = (todo: Todo, index: number) => {
    return (
      <div className="col-12" key={todo.id}>
        <div
          className={classNames(
            "flex flex-column xl:flex-row xl:align-items-start p-4 gap-4",
            { "border-top-1 surface-border": index !== 0 }
          )}
        >
          <img
            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            src={`https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/QWER_Southkorean_band.png/500px-QWER_Southkorean_band.png`}
            alt={todo.title}
          />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{todo.title}</div>

              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{todo.tag}</span>
                </span>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <Button
                onClick={() => handleClickEditTodo(todo)}
                icon="pi pi-pen-to-square"
                className="p-button-rounded"
              ></Button>
              <Button
                onClick={async () => {
                  showToast("info", "Deleting");
                  await deleteTodo(todo.id);
                  showToast("success", "Deleted");
                }}
                icon="pi pi-trash"
                className="p-button-rounded"
                severity="danger"
              ></Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const listTemplate = (todos: Todo[]) => {
    if (!todos || todos.length === 0) return null;

    const list = todos.map((todo, index) => {
      return itemTemplate(todo, index);
    });

    return <div className="grid grid-nogutter">{list}</div>;
  };

  // TODO: Add spinner

  return (
    <div className="card">
      <DataView value={searchedTodos} listTemplate={listTemplate} />
      <div className="flex justify-content-center">
        <Button
          label="Add"
          size="large"
          onClick={() => handleClickEditTodo()}
        />
      </div>
    </div>
  );
}
