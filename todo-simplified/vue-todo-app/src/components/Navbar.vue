<template>
  <div class="navbar bg-base-100 shadow-sm">
    <div class="navbar-start">
      <a href="#" class="btn btn-ghost text-xl">Vue Todo App</a>
    </div>

    <div class="navbar-end">
      <ThemeToggle />
    </div>
  </div>
</template>

<script setup>
import ThemeToggle from './ThemeToggle.vue';
</script>
