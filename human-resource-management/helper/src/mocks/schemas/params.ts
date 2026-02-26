import z from 'zod';

export const findEmployeeParamsSchema = z.object({
  // Route params are strings; coerce to the schema's id type for lookup.
  id: z.coerce.number(),
});
