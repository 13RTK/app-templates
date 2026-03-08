import { useQuery } from '@tanstack/vue-query';
import { getEmployees } from '@/services/apiEmployee';

export function useEmployees() {
  const {
    data: employees,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['employees'],
    queryFn: getEmployees,
  });

  return { employees, isLoading, error };
}
