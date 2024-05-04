import { useRouter } from 'vue-router';

export function useAuthPath() {
  const router = useRouter();

  function goToLogin() {
    router.push({
      query: {
        auth: 'login',
      },
    });
  }

  function goToSignup() {
    router.push({
      query: {
        auth: 'signup',
      },
    });
  }

  return { goToLogin, goToSignup };
}
