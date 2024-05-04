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

<script setup>
import { useSearchStore } from '@/stores/search';
import { storeToRefs } from 'pinia';

const searchStore = useSearchStore();
const { searchQuery } = storeToRefs(searchStore);
</script>
