<template>
  <h1>We got error: {{ errorMessage }}</h1>
</template>

<script setup lang="ts">
defineProps<{
  errorMessage: string;
}>();
</script>
