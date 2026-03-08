/** biome-ignore-all lint/suspicious/noExplicitAny: <for test> */
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { logout as logoutApi } from '@/services/apiAuth';

export const useUserStore = defineStore('user', () => {
  const user = ref<any>('');

  function login(updateUser: any) {
    user.value = updateUser;
  }

  function logout() {
    user.value = '';
    logoutApi();
  }

  return { user, login, logout };
});
