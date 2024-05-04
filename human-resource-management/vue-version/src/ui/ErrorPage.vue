<template>
  <h1>We got error: {{ errorMessage }}</h1>
</template>

<script setup>
defineProps({
  errorMessage: String,
});
</script>
