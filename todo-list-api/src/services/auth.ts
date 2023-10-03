import { SignInInput, SignUpInput, SignUpOutput, signInSchema, signUpInputSchema } from "../schemas";
import prisma from "../providers/prisma";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

export class AuthService {
  async signUp(user: SignUpInput): Promise<SignUpOutput> {
    console.log(`sign up: ${user}`)

    const parsed = signUpInputSchema.safeParse(user)

    if (!parsed.success) {
      throw parsed.error
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        username: parsed.data.username
      }
    })

    if (existingUser && existingUser.id) {
      throw new Error('User already exists, please sign in.')
    }

    try {
      const userDb = await prisma.user.create({
        data: {
          ...user,
          password: await hash(parsed.data.password, 10)
        }
      })

      const userInfo: SignUpOutput = {
        id: userDb.id,
        name: userDb.name,
        username: userDb.username
      }

      // Create token
      const token = sign(
        userInfo,
        process.env.TOKEN_KEY ?? 'bizcuit',
        {
          expiresIn: "2h",
        }
      );

      userInfo.token = token

      return userInfo
    } catch (error) {
      console.log(error)

      throw error
    }
  }

  async signIn(user: SignInInput): Promise<SignUpOutput> {
    console.log(`sign up: ${user}`)

    const parsed = signInSchema.safeParse(user)

    if (!parsed.success) {
      throw parsed.error
    }

    try {
      const { username, password } = user

      const userDb = await prisma.user.findUnique({
        where: {
          username
        },
      })

      if (!userDb) {
        throw new Error('Please review your credentials.')
      }

      const validPassword = await compare(password, userDb.password)

      if (!validPassword) {
        throw new Error('Please review your credentials.')
      }

      const userInfo: SignUpOutput = {
        id: userDb.id,
        name: userDb.name,
        username: userDb.username
      }

      // Create token
      const token = sign(
        userInfo,
        process.env.TOKEN_KEY ?? 'bizcuit',
        {
          expiresIn: "2h",
        }
      );

      userInfo.token = token

      return userInfo
    } catch (error) {
      console.log(error)

      throw error
    }
  }
}