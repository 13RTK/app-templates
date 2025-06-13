import { useState } from "react";
import { Toast } from "primereact/toast";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import MenuBar from "./components/MenuBar";

import { useToast } from "./hooks/toast";
import TodoView from "./components/TodoView.tsx";

function App() {
  const { toast, showToast } = useToast();

  const [searchText, setSearchText] = useState<string>("");

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <MenuBar searchText={searchText} setSearchText={setSearchText} />

      <Toast ref={toast} />

      <TodoView showToast={showToast} searchText={searchText} />
    </QueryClientProvider>
  );
}

export default App;
