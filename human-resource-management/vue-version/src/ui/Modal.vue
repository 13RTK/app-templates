<template>
  <div class="modal-box">
    <slot />
  </div>
  <form method="dialog" class="modal-backdrop">
    <button @click="closeModal">close</button>
  </form>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function closeModal() {
  router.push({});
}
</script>
