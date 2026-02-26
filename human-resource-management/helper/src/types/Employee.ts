import type z from 'zod';
import type { employeeSchema } from '../schemas/employee';

export type Employee = z.infer<typeof employeeSchema>;
