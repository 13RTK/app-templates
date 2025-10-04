<template>
  <h1 class="text-center text-4xl" v-if="isError">
    Error: {{ error.message }}
  </h1>

  <Loading v-else-if="isPending" />

  <h1 class="text-center text-4xl" v-else-if="!todoList.length">
    Todo List Is Empty
  </h1>

  <ul class="list bg-base-100 rounded-box shadow-sm w-2/3 mx-auto" v-else>
    <TodoItem v-for="todo in sortedTodoList" :key="todo.id" :todo="todo" />
  </ul>
</template>

<script setup>
import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';

import { getTodos } from '@/services/apiTodo.js';
import TodoItem from './TodoItem.vue';
import Loading from './Loading.vue';

const {
  isPending,
  isError,
  data: todoList,
  error,
} = useQuery({
  queryKey: ['todos'],
  queryFn: () => getTodos(),
});

const sortedTodoList = computed(() => {
  if (!todoList.value) {
    return [];
  }

  return [...todoList.value].sort((a, b) => {
    if (a.isCompleted === b.isCompleted) {
      return 0;
    }

    return a.isCompleted ? 1 : -1;
  });
});
</script>

<style>
* {
  text-align: center;
}
</style>
