<template>
  <button :class="`btn ${size} ${theme} ${classes}`" :type="type">
    <div v-show="!isLoading">
      <slot />
    </div>
    <div v-show="isLoading">
      <span class="loading loading-spinner"></span>
    </div>
  </button>
</template>

<script setup lang="ts">

const { type = 'submit'} = defineProps<{
  theme?: string;
  size?: string;
  classes?: string;
  isLoading?: boolean;
  type?: 'submit' | 'reset' | 'button';
}>()
</script>
