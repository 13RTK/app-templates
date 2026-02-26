import { Collection } from '@msw/data';
import z from 'zod';

const employees = new Collection({
  schema: z.object({
    id: z.number(),
    name: z.string(),
  }),
});
