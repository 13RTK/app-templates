<template>
  <label class="form-control w-full max-w-xs mx-auto">
    <div class="label">
      <span class="label-text">Search Employee</span>
    </div>
    <input
      type="text"
      placeholder="Employee Name"
      class="input input-bordered w-full max-w-xs input-md"
      v-model="searchQuery"
    />
  </label>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSearchStore } from '@/stores/search';

const searchStore = useSearchStore();
const { searchQuery } = storeToRefs(searchStore);
</script>
