<template>
  <!-- TODO: missing form validator -->
  <form class="my-4 w-full text-center" @submit.prevent="handleSubmit">
    <label>
      <div class="avatar">
        <div class="w-24 rounded-full">
          <img :src="initialEmployee.avatar" />
        </div>
      </div>
    </label>

    <!-- Name -->
    <label
      class="input input-bordered flex items-center gap-2 my-4 w-1/2 mx-auto"
    >
      name
      <input
        type="text"
        class="grow"
        placeholder="Enter the name"
        name="key"
        v-model="initialEmployee.name"
      />
    </label>

    <!-- Country -->
    <label
      class="input input-bordered flex items-center gap-2 my-4 w-1/2 mx-auto"
    >
      country
      <input
        type="text"
        class="grow"
        placeholder="Enter the country"
        name="key"
        v-model="initialEmployee.country"
      />
    </label>

    <!-- Role -->
    <label
      class="input input-bordered flex items-center gap-2 my-4 w-1/2 mx-auto"
    >
      role
      <input
        type="text"
        class="grow"
        placeholder="Enter the role"
        name="key"
        v-model="initialEmployee.role"
      />
    </label>

    <!-- Department -->
    <label
      class="input input-bordered flex items-center gap-2 my-4 w-1/2 mx-auto"
    >
      department
      <input
        type="text"
        class="grow"
        placeholder="Enter the department"
        name="key"
        v-model="initialEmployee.department"
      />
    </label>

    <!-- company -->
    <label
      class="input input-bordered flex items-center gap-2 my-4 w-1/2 mx-auto"
    >
      company
      <input
        type="text"
        class="grow"
        placeholder="Enter the company"
        name="key"
        v-model="initialEmployee.company"
      />
    </label>

    <Button classes="w-1/3" :isLoading="isCreating">Add Employee</Button>
  </form>
</template>

<script setup>
import Button from '@/ui/Button.vue';

import { useInsert } from './useInsert';

const { handleSubmit, initialEmployee, isCreating } = useInsert();
</script>
