import { getEmployees } from '@/services/apiEmployee';
import { useQuery } from '@tanstack/vue-query';

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
