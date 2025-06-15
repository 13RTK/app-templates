import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import TodoList from "./TodoList.tsx";
import TodoDialog from "./TodoDialog.tsx";

import { ToastSeverity } from "../types/ToastSeverity.ts";

function TodoView({
  showToast,
}: {
  showToast: (severity: ToastSeverity, summary?: string) => void;
}) {
  const todoQueryClient = useQueryClient();
  const [buttonLabel, setButtonLabel] = useState<string>("Update");

  return (
    <>
      <TodoList
        todoQueryClient={todoQueryClient}
        showToast={showToast}
        setButtonLabel={setButtonLabel}
      />
      <TodoDialog
        buttonLabel={buttonLabel}
        showToast={showToast}
        todoQueryClient={todoQueryClient}
      />
    </>
  );
}

export default TodoView;
