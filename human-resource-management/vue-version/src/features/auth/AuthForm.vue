<template>
  <div role="tablist" class="tabs tabs-boxed">
    <a
      role="tab"
      :class="{ tab: true, 'tab-active': authQuery === 'login' }"
      @click="handleClickLogin"
    >
      Login
    </a>
    <a
      role="tab"
      :class="{ tab: true, 'tab-active': authQuery === 'signup' }"
      @click="handleClickSignup"
    >
      Signup
    </a>
  </div>

  <component :is="forms[currentForm]"></component>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthPath } from './useAuthPath';

import LoginForm from './login/LoginForm.vue';
import SignupForm from './signup/SignupForm.vue';

const route = useRoute();
const { goToLogin, goToSignup } = useAuthPath();

const authQuery = computed(() => route.query.auth);

const currentForm = ref('');
const forms = {
  LoginForm,
  SignupForm,
};

watch(
  () => authQuery.value,
  (newValue) => {
    currentForm.value = newValue === 'login' ? 'LoginForm' : 'SignupForm';
  }
);

function handleClickLogin() {
  if (authQuery === 'login') {
    return;
  }

  goToLogin();
}

function handleClickSignup() {
  if (authQuery === 'signup') {
    return;
  }

  goToSignup();
}
</script>
