import { z } from "zod";

/*
* Sign up schemas
*/
export const signUpInputSchema = z.object({
  name: z.string().min(1),
  username: z.string().min(1).max(20),
  password: z.string().min(1).max(20)
})

export type SignUpInput = z.infer<typeof signUpInputSchema>

export const signUpOutputSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  username: z.string().min(1),
  token: z.string().min(1).optional()
})

export type SignUpOutput = z.infer<typeof signUpOutputSchema>

/*
* Sign in schemas
*/

export const signInSchema = z.object({
  username: z.string().min(1).max(20),
  password: z.string().min(1).max(20)
})

export type SignInInput = z.infer<typeof signInSchema>

export type LoggedUser = z.infer<typeof signUpOutputSchema>