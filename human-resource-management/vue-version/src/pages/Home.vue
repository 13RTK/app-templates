<template>
  <SearchBar />

  <EmployeeTable />
</template>

<script setup>
import { onMounted } from 'vue';

import { getItem } from '@/utils/localstorageHelper';
import { getConfig } from '@/utils/configHelper';

import { useRetrieve } from '@/hooks/useRetrieve';

import SearchBar from '@/features/home/SearchBar.vue';
import EmployeeTable from '@/features/home/EmployeeTable.vue';

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
