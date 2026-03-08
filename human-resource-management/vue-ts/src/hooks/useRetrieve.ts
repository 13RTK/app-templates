import { useMutation } from '@tanstack/vue-query';
import { retrieveUser as retrieveUserApi } from '@/services/apiUser';
import { useUserStore } from '@/stores/user';
import { getConfig } from '@/utils/configHelper';
import { removeItem } from '@/utils/localstorageHelper';
import { toast } from '@/utils/toastHelper';

const SUPABASE_AUTH_KEY = getConfig('SUPABASE_AUTH_KEY');
export function useRetrieve() {
  const { login } = useUserStore();

  const { mutate: retrieveUser } = useMutation({
    mutationKey: ['currentUser'],
    mutationFn: retrieveUserApi,
    // TODO
    // biome-ignore lint/suspicious/noExplicitAny: <Wait for supabase user type>
    onSuccess: (data: any) => {
      toast(`Making you login in...`, 'info');
      login(data);
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
