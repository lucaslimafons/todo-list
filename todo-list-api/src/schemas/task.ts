import { z } from "zod";

export const taskCreateSchema = z.object({
  description: z.string().min(1),
  deadline: z.date().optional(),
  isDone: z.boolean().optional().default(false),
  priority: z.number().optional().default(0),
  userId: z.string().uuid().min(1)
})

export type TaskCreateInput = z.infer<typeof taskCreateSchema>

export const taskUpdateSchema = z.object({
  id: z.string().uuid(),
  description: z.string().min(1),
  deadline: z.date().optional(),
  isDone: z.boolean().default(false),
  priority: z.number().default(0),
  userId: z.string().uuid().min(1)
})

export type TaskUpdateInput = z.infer<typeof taskUpdateSchema>

export const taskBasicSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().min(1)
})

export type TaskFilterSchema = z.infer<typeof taskBasicSchema>
export type TaskDeleteInput = z.infer<typeof taskBasicSchema>