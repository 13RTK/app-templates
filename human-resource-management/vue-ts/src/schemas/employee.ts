import z from 'zod';

export const employeeSchema = z.object({
  id: z.int(),
  name: z.string(),
  role: z.string(),
  country: z.string(),
  avatar: z.url(),
  department: z.string(),
  company: z.string(),
});

export type Employee = z.infer<typeof employeeSchema>;
export type UpdateEmployeeDto = Partial<Employee>;
