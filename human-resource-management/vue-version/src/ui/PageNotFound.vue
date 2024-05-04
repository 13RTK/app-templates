<template>
  <div role="alert" class="alert alert-error w-2/3 mx-auto mt-20">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="stroke-current shrink-0 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <span>Error! We can not find the path: {{ route.path }}</span>
  </div>

  <button class="btn btn-lg btn-outline btn-accent mx-auto mt-10 flex">
    <RouterLink :to="{ name: 'home' }"> Back To Home </RouterLink>
  </button>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
