import type Employee from '../types/Employee';
import supabase from '../utils/supabase';

export async function insertEmployees(employees: Employee[]) {
  const { data, error } = await supabase
    .from('employee')
    .insert(employees)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
