<template>
  <Loading v-if="isLoadingEmployee" />

  <form class="my-4 w-full text-center" @submit.prevent="handleSubmit" v-else>
    <label for="avatar">
      <div class="avatar cursor-pointer">
        <div class="w-24 rounded-full">
          <img :src="avatar" />
        </div>
      </div>
    </label>

    <input
      type="file"
      id="avatar"
      accept="image/*"
      class="hidden"
      @change="handleChangeAvatar"
    />

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
        v-model="name"
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
        placeholder="Enter the name"
        name="key"
        v-model="country"
      />
    </label>

    <Button classes="w-1/3" :isLoading="isUpdatingEmployee || isUploading"
      >Update</Button
    >
  </form>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { useLoadEmployee } from './useLoadEmployee';
import { useUpdateEmployee } from './useUpdateEmployee';
import { useUploadAvatar } from './useUploadAvatar';

import { getConfig } from '@/utils/configHelper';
import { generateFilename } from '@/utils/fileHelper';

import Loading from '@/ui/Loading.vue';
import Button from '@/ui/Button.vue';

const route = useRoute();
const employeeId = route.params.employeeId;

const SUPABASE_URL = getConfig('SUPABASE_URL');

function handleSubmit() {
  // avatar not changed
  if (!avatarObj.value) {
    updateEmployee(employeeId);
    return;
  }

  const filename = generateFilename(avatarObj.value.name);

  uploadAvatar(filename, {
    onSuccess: (avatarData) => {
      avatar.value = `${SUPABASE_URL}storage/v1/object/public/${avatarData.fullPath}`;

      updateEmployee(employeeId);
    },
  });
}

function handleChangeAvatar(event) {
  const fileObj = event.target.files[0];
  avatarObj.value = fileObj;

  avatar.value = URL.createObjectURL(fileObj);
}

const { avatarObj, uploadAvatar, isUploading } = useUploadAvatar();

const { getEmployee, isLoadingEmployee } = useLoadEmployee();
const { name, country, avatar, updateEmployee, isUpdatingEmployee } =
  useUpdateEmployee();

onMounted(() => {
  getEmployee(employeeId, {
    onSuccess: (employee) => {
      name.value = employee.name;
      country.value = employee.country;
      avatar.value = employee.avatar;
    },
  });
});
</script>
