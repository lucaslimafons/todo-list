import { Request, Response } from "express"
import { AuthService } from "../services/auth"
import { handleResponse } from "./utils/handler"

const authService = new AuthService()

export const signUp = async (request: Request, response: Response) => {
  return handleResponse(response, async () => {
    return await authService.signUp(request.body)
  })
}

export const signIn = async (request: Request, response: Response) => {
  return handleResponse(response, async () => {
    return await authService.signIn(request.body)
  })
}