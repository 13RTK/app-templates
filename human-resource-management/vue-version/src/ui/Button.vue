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

<script setup>
defineProps({
  theme: {
    type: String,
    default: 'btn-primary',
    required: false,
  },

  size: {
    type: String,
    default: 'btn-md',
    required: false,
  },

  classes: {
    type: String,
    default: 'w-1/3',
    required: false,
  },

  isLoading: {
    type: Boolean,
    default: false,
    required: false,
  },

  type: {
    type: String,
    default: 'submit',
  },
});
</script>
