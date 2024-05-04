import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { updateEmployee as updateEmployeeApi } from '@/services/apiEmployee';
import { toast } from '@/utils/toastHelper';
import { ref } from 'vue';

export function useUpdateEmployee() {
  const name = ref('');
  const country = ref('');
  const avatar = ref('');

  const queryClient = useQueryClient();
  const { mutate: updateEmployee, isPending: isUpdatingEmployee } = useMutation(
    {
      mutationKey: ['update-employee'],
      mutationFn: (id) =>
        updateEmployeeApi(id, {
          name: name.value,
          country: country.value,
          avatar: avatar.value,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries(['employee', 'employees']);
        toast('update successfully', 'success');
      },
      onError: (error) => {
        toast(`update failed: ${error.message}`, 'error');
      },
    }
  );

  return { name, country, avatar, updateEmployee, isUpdatingEmployee };
}
