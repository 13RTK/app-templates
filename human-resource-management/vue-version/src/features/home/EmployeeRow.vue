<template>
  <tr :key="employee.id" class="hover">
    <td>
      <div class="flex items-center gap-3">
        <div class="avatar">
          <div class="mask mask-squircle w-12 h-12">
            <img :src="employee.avatar" alt="Avatar Tailwind CSS Component" />
          </div>
        </div>

        <!-- Name and country -->
        <div>
          <div class="font-bold">{{ employee.name }}</div>
          <div class="text-sm opacity-50">{{ employee.country }}</div>
        </div>
      </div>
    </td>

    <!-- Job Title and Department -->
    <td>
      {{ employee.role }}
      <br />
      <span class="badge badge-ghost badge-sm">{{ employee.department }}</span>
    </td>

    <!-- Company -->
    <td>{{ employee.company }}</td>

    <!-- Operations -->
    <th>
      <Button size="btn-xs" classes="mx-2" @click="handleClickEdit">
        Edit
      </Button>

      <Button
        size="btn-xs"
        classes="btn-error"
        @click="handleClickDelete"
        :isLoading="isDeleting"
      >
        Delete
      </Button>
    </th>
  </tr>
</template>

<script setup>
import { useEmployeeOperate } from './useEmployeeOperate';

import Button from '@/ui/Button.vue';

const props = defineProps({
  employee: Object,
});

const { handleClickEdit, handleClickDelete, isDeleting } =
  useEmployeeOperate(props);
</script>
