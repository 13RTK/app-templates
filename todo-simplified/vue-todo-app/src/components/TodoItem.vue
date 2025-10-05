<template>
  <li
    class="list-row flex items-center justify-between my-1"
    :class="todo.iscomplete ? 'bg-base-300' : ''"
  >
    <div>
      <!-- Title -->
      <div>{{ todo.title }}</div>
      <!-- Description -->
      <div class="text-xs uppercase font-semibold opacity-60">
        {{ todo.description }}
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-between gap-2">
      <!-- Complete -->
      <button
        class="btn btn-square btn-ghost"
        @click="() => completeTodo(Number(todo.id))"
        :disabled="isLoading"
        v-show="!todo.iscomplete"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 48 48"
        >
          <g
            fill="#1d8ddb"
            fill-rule="evenodd"
            clip-rule="evenodd"
            stroke-width="1"
            stroke="#1d8ddb"
          >
            <path
              d="M24 42c9.941 0 18-8.059 18-18S33.941 6 24 6S6 14.059 6 24s8.059 18 18 18m0 2c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20"
            />
            <path
              d="M34.67 16.259a1 1 0 0 1 .072 1.412L21.386 32.432l-8.076-7.709a1 1 0 0 1 1.38-1.446l6.59 6.29L33.259 16.33a1 1 0 0 1 1.413-.07"
            />
          </g>
        </svg>
      </button>

      <!-- Delete -->
      <button
        class="btn btn-square btn-ghost"
        @click="() => deleteTodo(todo.id)"
        :disabled="isLoading"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="#ec0202"
            d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
            stroke-width="0.7"
            stroke="#ec0202"
          />
        </svg>
      </button>
    </div>
  </li>
</template>

<script setup>
import { useTodoItem } from '@/composables/todo.js';

defineProps({
  todo: {
    type: Object,
    required: true,
  },
});

const { completeTodo, deleteTodo, isLoading } = useTodoItem();
</script>
