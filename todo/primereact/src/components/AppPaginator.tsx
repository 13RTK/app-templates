import { useAtom, useAtomValue } from "jotai";
import { QueryClient } from "@tanstack/react-query";
import { Paginator } from "primereact/paginator";

import { currentTodoStartIndexAtom } from "../atoms/pagination.ts";
import { searchTextAtom } from "../atoms/search.ts";

import { useCountTodo } from "../hooks/todo/countTodo.ts";

const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE;

function AppPaginator() {
  const [currentTodoStartIndex, setCurrentTodoStartIndex] = useAtom(
    currentTodoStartIndexAtom
  );
  const searchText = useAtomValue(searchTextAtom);

  const { todoCount, isTodoCountLoading } = useCountTodo(searchText);

  // Page change
  const onPageChange = (event: any) => {
    setCurrentTodoStartIndex(event.first);
  };

  return (
    <>
      {!isTodoCountLoading && (
        <Paginator
          alwaysShow={false}
          first={currentTodoStartIndex}
          rows={PAGE_SIZE}
          totalRecords={todoCount.count}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}

export default AppPaginator;
