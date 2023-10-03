import prisma from "../providers/prisma";
import { LoggedUser, TaskCreateInput, TaskDeleteInput, TaskFilterSchema, TaskUpdateInput, taskCreateSchema, taskUpdateSchema } from "../schemas";

export class TaskService {
  async findAll(userId: string) {
    const allTasks = await prisma.task.findMany({
      where: {
        userId,
        deletedAt: null
      }
    })

    return allTasks
  }

  async findById(filter: TaskFilterSchema) {
    const task = await prisma.task.findUnique({
      where: {
        ...filter,
        deletedAt: null
      }
    })

    return task
  }

  async create(task: TaskCreateInput) {
    console.log(`Create task: ${task}`)

    const parsed = taskCreateSchema.safeParse(task)

    if (!parsed.success) {
      throw parsed.error
    }

    try {
      const taskDb = await prisma.task.create({
        data: parsed.data
      })

      return taskDb
    } catch (error) {
      console.error(error)

      // foreign key constraint failed on the field
      if (error.code === 'P2003') {
        throw new Error('Invalid user.')
      }

      throw error
    }
  }

  async update(task: TaskUpdateInput) {
    console.log(`Update task: ${task}`)

    const parsed = taskUpdateSchema.safeParse(task)

    if (!parsed.success) {
      throw parsed.error
    }

    try {
      const { id, userId } = parsed.data

      const taskDb = await prisma.task.update({
        where: {
          id,
          userId,
          deletedAt: null
        },
        data: {
          ...parsed.data,
          updatedAt: new Date()
        }
      })

      return taskDb
    } catch (error) {
      console.error(error)

      // foreign key constraint failed on the field
      if (error.code === 'P2003') {
        throw new Error('Invalid user.')
      }

      throw error
    }
  }

  async delete(task: TaskDeleteInput) {
    try {
      const taskDb = await prisma.task.delete({
        where: {
          ...task,
          deletedAt: null
        }
      })

      return taskDb
    } catch (error) {
      console.error(error)

      throw error
    }
  }
} 