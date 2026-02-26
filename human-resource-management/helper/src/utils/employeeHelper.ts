import { fake, setFaker } from 'zod-schema-faker/v4';
import { faker } from '@faker-js/faker';

import { type Employee } from '@/types/Employee';
import { insertEmployees as insertEmployeesApi } from '@/services/apiEmployee';
import { employeeSchema } from '@/schemas/employee';

setFaker(faker);

export async function insertEmployees(count: number) {
  const employees = getFakeEmployees(count);

  console.log(`Inserting ${count} employees...`);

  const data = await insertEmployeesApi(employees);

  console.log(`data from supabase: ${JSON.stringify(data)}`);
}

export function getFakeEmployees(count: number): Employee[] {
  const employees: Employee[] = [];
  for (let idx = 1; idx <= count; idx++) {
    const employee = getFakeEmployee();

    if (employees.some((e) => e.id === employee.id)) {
      idx--;
      continue;
    }

    employees.push(employee);
  }

  return employees;
}

export function getFakeEmployee(): Employee {
  const employee = fake(employeeSchema);

  return employee;
}
