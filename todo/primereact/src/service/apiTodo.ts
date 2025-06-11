import { Todo, TodoDetail } from "../types/Todo";
// import { faker } from "@faker-js/faker";
// import { getTodo } from "../utils/todoHelper";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(BASE_URL);
  const todoData = await response.json();

  return todoData.map((todo: any) => {
    return {
      id: todo.id,
      title: todo.title,
      tag: todo.tag,
    };
  });
}

export async function getTodoContentById(id: number): Promise<string> {
  const response = await fetch(`${BASE_URL}/${id}`);
  const todoData = await response.json();

  return todoData.content;
}

export async function deleteTodoById(id: number) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();

  return result;
}

type UpdateTodoDetail = {
  id: number;
  title?: string;
  tag?: string;
  content?: string;
};

export async function updateTodo(todo: UpdateTodoDetail) {
  const response = await fetch(BASE_URL, {
    method: "PATCH",
    body: JSON.stringify(todo),
  });
  const result = await response.json();

  return result;
}

export async function addTodo(todo: TodoDetail) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify(todo),
  });
  const result = await response.json();

  return result;
}
