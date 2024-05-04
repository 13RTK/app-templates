<template>
  <div class="text-center mx-auto">
    <vee-form class="my-4" @submit="login" :validation-schema="loginFormSchema">
      <label class="input input-bordered flex items-center gap-2">
        <EmailSvg />
        <vee-field
          type="text"
          class="grow"
          placeholder="Email"
          name="email"
          v-model="email"
          :disabled="isLogging"
        />
        <ErrorMessage name="email" class="text-red-600" />
      </label>

      <br />
      <label class="input input-bordered flex items-center gap-2">
        <PasswordSvg />
        <vee-field
          type="password"
          class="grow"
          placeholder="Password"
          name="password"
          v-model="password"
          :disabled="isLogging"
        />
        <ErrorMessage name="password" class="text-red-600" />
      </label>

      <div class="my-4">
        <Button classes="mx-2 w-1/3" :isLoading="isLogging"> Login </Button>
        <Button classes="mx-2 w-1/3" theme="btn-ghost">
          Forget Password
        </Button>
      </div>
    </vee-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';

import { login as loginApi } from '@/services/apiLogin';
import { toast } from '@/utils/toastHelper';

import EmailSvg from '@/ui/EmailSvg.vue';
import PasswordSvg from '@/ui/PasswordSvg.vue';
import Button from '@/ui/Button.vue';

const loginFormSchema = {
  email: 'required|email',
  password: 'required|min:6',
};

const email = ref('');
const password = ref('');

const { mutate: login, isPending: isLogging } = useMutation({
  mutationKey: ['login'],
  mutationFn: () => {
    toast('Processing...', 'info');
    return loginApi(email.value, password.value);
  },
  onSuccess: () => {
    location.reload();
  },
  onError: (error) => {
    toast(error.message, 'error');
  },
});
</script>
