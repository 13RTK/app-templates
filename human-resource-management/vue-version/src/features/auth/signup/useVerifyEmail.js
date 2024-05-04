import { ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';

import { toast } from '@/utils/toastHelper';
import { verifyEmail as verifyEmailApi } from '@/services/apiVerifyEmail';

export function useVerifyEmail(email) {
  const verifyToken = ref('');

  const { mutate: verifyEmail, isPending: isVerifying } = useMutation({
    mutationKey: ['verifyEmail'],
    mutationFn: () => verifyEmailApi(email.value, verifyToken.value),
    onSuccess: () => {
      // TODO: Remove in production
      location.replace('http://localhost:5173');

      // TODO: Enable in production
      // location.reload();
    },
    onError: (error) => {
      toast(error.message, 'error');
    },
  });

  return { verifyToken, verifyEmail, isVerifying };
}
