import { getEmployee as getEmployeeAPi } from '@/services/apiEmployee';
import { toast } from '@/utils/toastHelper';
import { useMutation } from '@tanstack/vue-query';

export function useLoadEmployee() {
  const { mutate: getEmployee, isPending: isLoadingEmployee } = useMutation({
    mutationKey: ['employee'],
    mutationFn: (employeeId) => getEmployeeAPi(employeeId),
    onError: (error) => {
      toast(error.message, 'error');
    },
  });

  return { getEmployee, isLoadingEmployee };
}
