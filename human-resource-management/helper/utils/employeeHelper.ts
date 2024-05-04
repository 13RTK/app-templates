import { faker } from '@faker-js/faker';
import Employee from '../types/Employee';
import { insertEmployees as insertEmployeesApi } from '../services/apiEmployee';

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
  const name: string = faker.person.fullName();
  const country: string = faker.location.country();
  const role: string = faker.person.jobTitle();
  const department: string = faker.commerce.department();
  const company: string = faker.company.name();
  const avatar: string = faker.image.avatar();

  return new Employee(name, country, role, department, company, avatar);
}
