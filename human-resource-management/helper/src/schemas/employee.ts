import z from 'zod';

export const employeeSchema = z.object({
  id: z.number().int().min(1).max(100),
  name: z.string(),
  country: z.string(),
  role: z.string(),
  department: z.string(),
  company: z.string(),
  avatar: z.string(),
});
