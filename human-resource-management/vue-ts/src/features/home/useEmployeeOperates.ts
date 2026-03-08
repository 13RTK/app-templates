import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { deleteEmployee as deleteEmployeeApi } from '@/services/apiEmployee';
import { useUserStore } from '@/stores/user';
import { toast } from '@/utils/toastHelper';
import type { Employee } from '../../schemas/employee';

export function useEmployeeOperate(props: { employee: Employee }) {
  const { user } = storeToRefs(useUserStore());
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: deleteEmployee, isPending: isDeleting } = useMutation({
    mutationKey: ['delete-employee'],
    mutationFn: (employeeId: number) => deleteEmployeeApi(employeeId),

    onSuccess: () => {
      toast('Employee deleted successfully', 'success');
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },

    onError: (error) => {
      toast(error.message, 'error');
    },
  });

  function verifyLoginState() {
    if (!user.value) {
      toast('Please login first', 'info');
      return false;
    }

    return true;
  }

  function handleClickEdit() {
    if (!verifyLoginState()) {
      return;
    }

    router.push({
      name: 'employee',
      params: { employeeId: props.employee.id },
    });
  }

  function handleClickDelete() {
    if (!verifyLoginState()) {
      return;
    }

    deleteEmployee(props.employee.id);
  }

  return {
    handleClickEdit,
    handleClickDelete,
    isDeleting,
  };
}
