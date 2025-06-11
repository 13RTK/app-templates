import { TodoDetail } from "../types/Todo";
import {
  addTodo as addTodoApi,
  deleteTodoById,
  getTodos,
  updateTodo as updateTodoApi,
} from "../service/apiTodo";
import { QueryClient, useQuery } from "@tanstack/react-query";

export function useTodo(todoQueryClient: QueryClient) {
  // const [todos, setTodos] = useState<Todo[]>([]);

  const {
    data: todos,
    isLoading: isTodoLoading,
    isError: isTodoLoadError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  async function deleteTodo(id: number) {
    await deleteTodoById(id);

    // setTodos(todos.filter((todo: Todo) => todo.id !== id));
    todoQueryClient.invalidateQueries({ queryKey: ["todos"] });
  }

  async function addTodo(todo: TodoDetail) {
    await addTodoApi(todo);

    // setTodos([...todos, { id: todo.id, title: todo.title, tag: todo.tag }]);
    todoQueryClient.invalidateQueries({ queryKey: ["todos"] });
  }

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

    // setTodos(
    //   todos.map((todo: Todo) =>
    //     todo.id === todoId
    //       ? {
    //           ...todo,
    //           tag: updateTodo.tag ? updateTodo.tag : todo.tag,
    //           title: updateTodo.title ? updateTodo.title : todo.title,
    //         }
    //       : todo
    //   )
    // );

    todoQueryClient.invalidateQueries({ queryKey: ["todos"] });
  }

  // useEffect(() => {
  //   async function loadData() {
  //     const todosData = await getTodos();

  //     setTodos(todosData);
  //   }

  //   loadData();
  // }, []);

  return {
    todos,
    deleteTodo,
    addTodo,
    updateTodo,
    isTodoLoadError,
    isTodoLoading,
  };
}
