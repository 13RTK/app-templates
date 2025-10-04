<template>
  <label class="input my-4">
    <input
      type="text"
      class="grow input-accent"
      placeholder="Add New Todo"
      v-model="todoTitle"
    />
    <button
      class="btn btn-primary btn-sm"
      @click="addTodo"
      :disabled="isPending"
    >
      Add
    </button>
  </label>
</template>

<script setup>
import { ref } from 'vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { addTodo as addTodoApi } from '@/services/apiTodo.js';

const todoTitle = ref('');

const queryClient = useQueryClient();

const { mutate: addTodo, isPending } = useMutation({
  mutationFn: async () => {
    if (!todoTitle.value) {
      alert('Please enter todo title');
      return;
    }

    const todo = {
      id: Date.now(),
      title: todoTitle.value,
      description: 'Todo description',
      isCompleted: false,
    };

    return await addTodoApi(todo);
  },
  mutationKey: ['todos'],
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] });
    todoTitle.value = '';
  },
});
</script>
