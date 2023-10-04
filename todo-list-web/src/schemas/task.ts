import { z } from "zod"

export const taskSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(1),
  deadline: z.coerce.date().optional(),
  isDone: z.boolean().default(false),
  priority: z.number().default(0),
  userId: z.string().uuid().min(1)
})

export type Task = z.infer<typeof taskSchema>