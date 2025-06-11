import { useState } from "react";
import { Toast } from "primereact/toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import MenuBar from "./components/MenuBar";
import TodoList from "./components/TodoList";
import TodoDialog from "./components/TodoDialog";

import { useToast } from "./hooks/toast";

import { Todo } from "./types/Todo";

function App() {
  const { toast, showToast } = useToast();

  const [visible, setVisible] = useState<boolean>(false);

  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [tag, setTag] = useState<string>("");

  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [buttonLabel, setButtonLabel] = useState<string>("Update");

  const [searchText, setSearchText] = useState<string>("");

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MenuBar searchText={searchText} setSearchText={setSearchText} />

      {/* <TodoList
        showToast={showToast}
        todos={todos}
        deleteTodo={deleteTodo}
        handleClickEditTodo={handleClickEditTodo}
        searchText={searchText}
      /> */}

      <TodoList
        showToast={showToast}
        searchText={searchText}
        setButtonLabel={setButtonLabel}
      />

      <Toast ref={toast} />

      {/* TODO: fix props via atoms */}
      <TodoDialog
        visible={visible}
        setVisible={setVisible}
        content={content}
        setContent={setContent}
        title={title}
        setTitle={setTitle}
        tag={tag}
        setTag={setTag}
        buttonLabel={buttonLabel}
        addTodo={addTodo}
        updateTodo={updateTodo}
        showToast={showToast}
        currentTodo={currentTodo}
      />
    </QueryClientProvider>
  );
}

export default App;
