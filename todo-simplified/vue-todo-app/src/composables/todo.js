import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { computed } from 'vue';

import {
  completeTodo as completeTodoApi,
  deleteTodo as deleteTodoApi,
} from '@/services/apiTodo.js';

export function useTodoItem() {
  const queryClient = useQueryClient();

  const { mutate: completeTodo, isPending: isCompleting } = useMutation({
    mutationFn: completeTodoApi,
    mutationKey: ['todos'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const { mutate: deleteTodo, isPending: isDeleting } = useMutation({
    mutationFn: deleteTodoApi,
    mutationKey: ['todos'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const isLoading = computed(() => {
    return isCompleting.value || isDeleting.value;
  });

  return {
    completeTodo,
    deleteTodo,
    isLoading,
  };
}
