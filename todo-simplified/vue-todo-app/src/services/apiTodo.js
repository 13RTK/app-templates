// import { generateMockTodos } from '@/utils/todoHelper.js';

const API_URL = import.meta.env.VITE_API_URL;

const JWT_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidG9kb191c2VyIn0.xg8BgbfVOmjYt0hFjIXtQAf_MgH1zvE0MK-FTGzCwwA';

export async function getTodos(page = 1, limit = 5) {
  // return generateMockTodos(limit);

  try {
    const response = await fetch(`${API_URL}/todos`);
    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function completeTodo(id) {
  try {
    if (!id) {
      throw new Error('id is required');
    }

    console.log(id);

    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
      body: JSON.stringify({ isCompleted: true }),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function deleteTodo(id) {
  try {
    if (!id) {
      throw new Error('id is required');
    }

    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function addTodo(newTodo) {
  try {
    if (!newTodo) {
      throw new Error('newTodo is required');
    }

    const response = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
}
