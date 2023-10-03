import { PrismaClientInitializationError } from "@prisma/client/runtime/library"
import { Response } from "express"
import { ZodError } from "zod"

export const handleResponse = async (
  response: Response,
  method: () => Promise<unknown>
) => {
  try {
    const result = await method()
    return response.status(200).send(result ?? 'Ok')
  } catch (err) {
    if (err instanceof ZodError) {
      return response.status(422).send(err.message)
    } else if (err instanceof PrismaClientInitializationError) {
      return response.status(500).send(err.message)
    }
    
    return response.status(400).send(err.message)
  }
}