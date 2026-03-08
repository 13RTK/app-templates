import { faker } from '@faker-js/faker';
import { fake, setFaker } from 'zod-schema-faker/v4';
import { type Employee, employeeSchema } from '@/schemas/employee';

/**
 * UNSTABLE: Don't update the version of fakerjs
 *
 * If your got error about type mismatch between fakerjs and zod-schema-faker after updating the version of fakerjs, try to downgrade the version of fakerjs, or check the solution on: https://github.com/soc221b/zod-schema-faker/issues/671
 */
setFaker(faker);

export function generateEmployee(): Employee {
  const employee = fake(employeeSchema);

  return employee;
}
