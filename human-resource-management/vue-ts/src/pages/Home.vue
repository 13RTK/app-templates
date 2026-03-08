<template>
  <SearchBar />

  <EmployeeTable />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import EmployeeTable from '@/features/home/EmployeeTable.vue';
import SearchBar from '@/features/home/SearchBar.vue';

import { useRetrieve } from '@/hooks/useRetrieve';
import { getConfig } from '@/utils/configHelper';
import { getItem } from '@/utils/localstorageHelper';

const SUPABASE_AUTH_KEY = getConfig('SUPABASE_AUTH_KEY');
const { retrieveUser } = useRetrieve();

onMounted(() => {
  const token = getItem(SUPABASE_AUTH_KEY);
  if (!token) {
    return;
  }

  retrieveUser();
});
</script>
