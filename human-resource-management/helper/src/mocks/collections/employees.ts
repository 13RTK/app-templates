import { Collection } from '@msw/data';
import { employeeSchema } from '../../schemas/employee';

export const employeeCollection = new Collection({
  schema: employeeSchema,
});
