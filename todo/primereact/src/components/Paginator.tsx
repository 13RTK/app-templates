import { useAtom } from "jotai";
import { Paginator } from "primereact/paginator";

import { currentTodoStartIndexAtom } from "../atoms/pagination.ts";

const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE;

function AppPaginator() {
  const [currentTodoStartIndex, setCurrentTodoStartIndex] = useAtom(
    currentTodoStartIndexAtom
  );

  const onPageChange = (event: any) => {
    setCurrentTodoStartIndex(event.first);
  };

  return (
    <Paginator
      first={currentTodoStartIndex}
      rows={PAGE_SIZE}
      totalRecords={120}
      onPageChange={onPageChange}
    />
  );
}

export default AppPaginator;
