import { ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';

import { toast } from '@/utils/toastHelper';
import { signup as signupApi } from '@/services/apiSignup';

export function useSignup() {
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');

  const {
    mutate: signup,
    isPending: isSigning,
    isSuccess: isSend,
  } = useMutation({
    mutationKey: ['signup'],
    mutationFn: () => {
      toast('Processing...', 'info');
      return signupApi(email.value, password.value);
    },
    onSuccess: () => {
      toast('Please verify your email', 'success');
    },
    onError: (error) => {
      toast(error.message, 'error');
    },
  });

  return { signup, isSigning, isSend, email, password, confirmPassword };
}
