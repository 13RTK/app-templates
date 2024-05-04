<template>
  <!-- Signup Form -->
  <div class="text-center mx-auto" v-show="!isSend">
    <vee-form
      class="my-4"
      @submit="signup"
      :validation-schema="signupFormSchema"
    >
      <!-- email -->
      <label class="input input-bordered flex items-center gap-2">
        <EmailSvg />
        <vee-field
          type="text"
          class="grow"
          placeholder="Email"
          name="email"
          v-model="email"
          :disabled="isSigning"
        />
        <ErrorMessage name="email" class="text-red-600" />
      </label>

      <br />
      <!-- password -->
      <label class="input input-bordered flex items-center gap-2">
        <PasswordSvg />
        <vee-field
          type="password"
          class="grow"
          placeholder="Password"
          name="password"
          v-model="password"
          :disabled="isSigning"
        />
        <ErrorMessage name="password" class="text-red-600" />
      </label>

      <br />
      <!-- conform password -->
      <label class="input input-bordered flex items-center gap-2">
        <PasswordSvg />
        <vee-field
          type="password"
          class="grow"
          placeholder="Confirm Password"
          name="confirmPassword"
          v-model="confirmPassword"
          :disabled="isSigning"
        />
        <ErrorMessage name="confirmPassword" class="text-red-600" />
      </label>

      <div class="my-4">
        <Button :isLoading="isSigning">Signup</Button>
      </div>
    </vee-form>
  </div>

  <!-- Verify Code Form -->
  <div class="text-center mx-auto" v-show="isSend">
    <vee-form
      class="my-4"
      @submit="verifyEmail"
      :validation-schema="verifyFormSchema"
    >
      <label class="input input-bordered flex items-center gap-2">
        <PasswordSvg />
        <vee-field
          type="text"
          class="grow"
          placeholder="Verify Code"
          name="verifyToken"
          v-model="verifyToken"
          :disabled="isVerifying"
        />
        <Button
          size="btn-sm"
          classes="''"
          type="button"
          @click.prevent="resend"
          :isLoading="isResending"
          :disabled="resendCountdown > 0"
        >
          {{ resendCountdown > 0 ? `Resend(${resendCountdown})` : 'Resend' }}
        </Button>
      </label>
      <ErrorMessage name="verifyToken" class="text-red-600" />

      <div class="my-4">
        <Button classes="mx-2 w-1/3" :isLoading="isVerifying"
          >Verify Email</Button
        >
        <Button classes="mx-2 w-1/3" theme="btn-ghost">Cancel</Button>
      </div>
    </vee-form>
  </div>
</template>

<script setup>
import { watch, onUnmounted } from 'vue';

import { useSignup } from './useSignup';
import { useResend } from './useResend';
import { useVerifyEmail } from './useVerifyEmail';

import EmailSvg from '@/ui/EmailSvg.vue';
import PasswordSvg from '@/ui/PasswordSvg.vue';
import Button from '@/ui/Button.vue';

const signupFormSchema = {
  email: 'required|email',
  password: 'required|min:6',
  confirmPassword: 'required|min:6|confirmed:@password',
};

const verifyFormSchema = {
  verifyToken: 'required|digits:6',
};

const { signup, isSigning, isSend, email, password, confirmPassword } =
  useSignup();

const { verifyEmail, isVerifying, verifyToken } = useVerifyEmail(email);

const { resendCountdown, resend, isResending } = useResend();

let resendInterval;

watch(
  () => isSend.value,
  () => {
    resendInterval = setInterval(() => {
      if (resendCountdown.value > 0) {
        resendCountdown.value--;
      }
    }, 1000);
  }
);

onUnmounted(() => {
  clearInterval(resendInterval);
});
</script>
