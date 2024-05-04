import { logout } from '@/services/apiLogout';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref('');

  function loginCurrentUser(updateUser) {
    user.value = updateUser;
  }

  function logoutCurrentUser() {
    user.value = '';
    logout();
  }

  return { user, loginCurrentUser, logoutCurrentUser };
});
