import { fake, setFaker } from 'zod-schema-faker/v4';
import { faker } from '@faker-js/faker';

import { type Employee } from '../types/Employee';
import { insertEmployees as insertEmployeesApi } from '../services/apiEmployee';
import { employeeSchema } from '../schemas/employee';

setFaker(faker);

export async function insertEmployees(count: number) {
  const employees = [];
  for (let idx = 1; idx <= count; idx++) {
    const employee = getFakeEmployee();

    employees.push(employee);
  }

  console.log(`Inserting ${count} employees...`);

  const data = await insertEmployeesApi(employees);

  console.log(`data from supabase: ${JSON.stringify(data)}`);
}

export function getFakeEmployee(): Employee {
  const employee = fake(employeeSchema);

  return employee;
}
