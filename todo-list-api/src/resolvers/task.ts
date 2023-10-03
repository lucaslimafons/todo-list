import { Request, Response } from "express"
import { handleResponse } from "./utils/handler"
import { TaskService } from "../services/task"
import { TaskFilterSchema } from "../schemas"

const taskService = new TaskService()

export const create = async (request: Request, response: Response) => {
  return handleResponse(response, async () => {
    const payload = {
      ...request.body,
      userId: request.user.id
    }

    return await taskService.create(payload)
  })
}

export const update = async (request: Request, response: Response) => {
  return handleResponse(response, async () => {
    const payload = {
      ...request.body,
      id: request.params.id,
      userId: request.user.id
    }

    return await taskService.update(payload)
  })
}

export const destroy = async (request: Request, response: Response) => {
  return handleResponse(response, async () => {
    const payload = {
      id: request.params.id,
      userId: request.user.id
    }
    return await taskService.delete(payload)
  })
}

export const findById = async (request: Request, response: Response) => {
  return handleResponse(response, async () => {
    const payload: TaskFilterSchema = {
      id: request.params.id,
      userId: request.user.id
    }
    return await taskService.findById(payload)
  })
}

export const findAll = async (request: Request, response: Response) => {
  return handleResponse(response, async () => {
    return await taskService.findAll(request.user.id)
  })
}