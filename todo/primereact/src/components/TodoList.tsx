import { QueryClient } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { classNames } from "primereact/utils";

import { Todo } from "../types/Todo";
import { ToastSeverity } from "../types/ToastSeverity";

import { useTodoList } from "../hooks/todo/todoList.ts";
import Spinner from "./Spinner.tsx";

type TodoListProps = {
  showToast: (severity: ToastSeverity, summary: string) => void;
  searchText: string;
  setButtonLabel: (label: string) => void;
  todoQueryClient: QueryClient;
};

export default function TodoList({
  showToast,
  searchText,
  setButtonLabel,
  todoQueryClient,
}: TodoListProps) {
  const {
    todos,
    deleteTodo,
    isTodoLoadError,
    isTodoLoading,
    handleClickEditTodo,
  } = useTodoList(todoQueryClient, setButtonLabel);

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
                onClick={async () =>
                  deleteTodo(todo.id, {
                    onSuccess: () => {
                      showToast("success", "Successfully deleted todo");
                    },
                  })
                }
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

  return (
    <div className="card">
      {isTodoLoading && <Spinner />}
      {!isTodoLoading && isTodoLoadError && <div>Something went wrong</div>}
      {!isTodoLoading && !isTodoLoadError && (
        <DataView value={searchedTodos} listTemplate={listTemplate} />
      )}
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
