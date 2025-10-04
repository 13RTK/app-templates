import { faker } from '@faker-js/faker';

export function generateMockTodo(idx = Math.floor(Math.random() * 100)) {
  return {
    id: Number(`${Date.now()}${idx}`),
    title: faker.book.title(),
    description: faker.lorem.sentence({ min: 3, max: 5 }),
    isCompleted: false,
  };
}

export function generateMockTodos(count) {
  const todos = [];
  for (let i = 0; i < count; i++) {
    todos.push(generateMockTodo(i));
  }

  console.log(todos);
  return todos;
}
