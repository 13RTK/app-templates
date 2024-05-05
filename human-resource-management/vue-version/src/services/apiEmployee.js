import { getFakeEmployee } from '@/utils/employeeFakeHelper';

export async function getEmployees() {
  // Mock employees with faker js
  const employees = Array.from({ length: 10 }, () => getFakeEmployee());

  return employees;
}

export async function getEmployee(id) {}

export async function updateEmployee(id, updateObj) {}

export async function deleteEmployee(id) {}

export async function insertEmployee(employee) {}
