import type { Employee, UpdateEmployeeDto } from '@/schemas/employee';
import { generateEmployee } from '@/utils/employeeHelper';

export async function getEmployees(): Promise<Employee[]> {
  // Mock employees with faker js
  const employees = Array.from({ length: 10 }, () => generateEmployee());

  return employees;
}

export async function getEmployee(id: number) {}

export async function updateEmployee(
  id: number,
  updateEmployeeDto: UpdateEmployeeDto,
) {}

export async function deleteEmployee(id: number) {}

export async function insertEmployee(employee: Employee) {}
