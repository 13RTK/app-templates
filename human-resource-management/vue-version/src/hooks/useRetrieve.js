import { useMutation } from '@tanstack/vue-query';

import { useUserStore } from '@/stores/user';
import { getConfig } from '@/utils/configHelper';
import { retrieveUser as retrieveUserApi } from '@/services/apiRetrieveUser';
import { toast } from '@/utils/toastHelper';
import { removeItem } from '@/utils/localstorageHelper';

const SUPABASE_AUTH_KEY = getConfig('SUPABASE_AUTH_KEY');
export function useRetrieve() {
  const { loginCurrentUser } = useUserStore();

  const { mutate: retrieveUser } = useMutation({
    mutationKey: ['currentUser'],
    mutationFn: retrieveUserApi,
    onSuccess: (data) => {
      toast(`Making you login in...`, 'info');
      loginCurrentUser(data);
      toast(`Welcome back: ${data.email}`, 'success');
    },
    onError: (error) => {
      toast(error.message, 'error');
      removeItem(SUPABASE_AUTH_KEY);
    },
  });

  return {
    retrieveUser,
  };
}
