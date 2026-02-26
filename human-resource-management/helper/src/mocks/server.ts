import Elysia, { StatusMap } from 'elysia';

import seed from './seed.ts';
import { employeeCollection } from './collections/employees.ts';
import { employeeSchema } from '@/schemas/employee.ts';
import { notFoundSchema } from './schemas/response.ts';
import { findEmployeeParamsSchema } from './schemas/params.ts';

const port: number = Number(Bun.env.PORT ?? 3000);
const SERVER_URL = Bun.env.SERVER_URL ?? `http://localhost:${port}`;

// Seed in-memory data once on startup.
await seed();

new Elysia()
  .get('/employees', () => employeeCollection.findMany(), {
    response: { [StatusMap.OK]: employeeSchema.array() },
  })
  .get(
    '/employees/:id',
    ({ params: { id }, status }) => {
      const employee = employeeCollection.findFirst((employee) =>
        employee.where({
          id,
        }),
      );

      if (!employee) {
        return status('Not Found', {
          message: `Employee ${id} not found`,
        });
      }

      return employee;
    },
    {
      params: findEmployeeParamsSchema,
      response: {
        [StatusMap.OK]: employeeSchema,
        [StatusMap['Not Found']]: notFoundSchema,
      },
    },
  )
  .listen(port);

console.log(`Mock HTTP server running at ${SERVER_URL}:${port}`);
