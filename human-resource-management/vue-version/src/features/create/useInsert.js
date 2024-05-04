import { reactive } from 'vue';
import { useMutation } from '@tanstack/vue-query';

import { toast } from '@/utils/toastHelper';
import { getFakeAvatar } from '@/utils/employeeFakeHelper';

import { insertEmployee } from '@/services/apiEmployee';

export function useInsert() {
  const initialEmployee = reactive({
    avatar: getFakeAvatar(),
    name: '',
    country: '',
    role: '',
    department: '',
    company: '',
  });

  const { mutate: createEmployee, isPending: isCreating } = useMutation({
    mutationKey: ['create-employee'],
    mutationFn: (employee) => insertEmployee(employee),

    onSuccess: () => {
      toast('Employee created successfully', 'success');
    },

    onError: (error) => {
      toast(error.message, 'error');
    },
  });

  function handleSubmit() {
    const employee = {
      avatar: initialEmployee.avatar,
      name: initialEmployee.name,
      country: initialEmployee.country,
      role: initialEmployee.role,
      department: initialEmployee.department,
      company: initialEmployee.company,
    };

    createEmployee(employee);
  }

  return {
    initialEmployee,
    handleSubmit,
    isCreating,
  };
}
