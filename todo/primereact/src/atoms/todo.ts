import { atom } from "jotai";
import { Todo } from "../types/Todo.ts";

export const currentTodoAtom = atom<Todo | null>(null);

export const currentEditTodoInfoAtom = atom({
  title: "",
  tag: "",
  content: "",
});
