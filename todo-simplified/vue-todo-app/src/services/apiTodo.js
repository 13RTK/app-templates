// import { generateMockTodos } from '@/utils/todoHelper.js';

const API_URL = import.meta.env.VITE_API_URL;

const JWT_TOKEN = 'YOUR_TOKEN';

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

    const response = await fetch(`${API_URL}/todos?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
      body: JSON.stringify({ iscomplete: true }),
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

    const response = await fetch(`${API_URL}/todos?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
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
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
      body: JSON.stringify(newTodo),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
}
