<template>
  <Loading v-if="isLoading" />
  <ErrorPage v-else-if="error" :error-message="error.message" />
  <div class="overflow-x-auto" v-else>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Job</th>
          <th>Company</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
        <EmployeeRow
          v-for="employee in filteredEmployees"
          :employee="employee"
        />
      </tbody>
    </table>
    <div class="w-full text-center" v-if="user">
      <Button
        classes="mb-32 w-1/3 text-3xl"
        type="button"
        @click="() => router.push({ name: 'create' })"
        >+</Button
      >
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useEmployees } from './useEmployees';
import { useSearchStore } from '@/stores/search';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

import Loading from '@/ui/Loading.vue';
import ErrorPage from '@/ui/ErrorPage.vue';
import EmployeeRow from './EmployeeRow.vue';
import Button from '@/ui/Button.vue';

const { isLoading, employees, error } = useEmployees();
const router = useRouter();

const { searchQuery } = storeToRefs(useSearchStore());
const filteredEmployees = computed(() => {
  if (!searchQuery) {
    return employees.value;
  }

  return employees.value.filter((employee) => {
    return employee.name.includes(searchQuery.value);
  });
});

const { user } = storeToRefs(useUserStore());
</script>
