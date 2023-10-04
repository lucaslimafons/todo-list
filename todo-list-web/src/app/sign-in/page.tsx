"use client";

import { SignInInput, signInSchema } from "@/schemas/auth"
import { signIn } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod"
import { Alert, Button, Stack, TextField, Typography } from "@mui/material"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form"

export default function SignIn() {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = async (data: SignInInput) => {
    setError(null)
    try {
      const response = await signIn(data)

      router.push('/tasks')
    } catch (error) {
      setError(error.message)
    }
  }

  const onError = (error: FieldErrors<SignInInput>) => console.error(error)
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Stack spacing={4}>
          {
            error ? (
              <Alert severity="error">{error}</Alert>
            ) : ''
          }

          <Typography variant="h3">
            Sign in
          </Typography>

          <TextField
            label="Username"
            {...register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
          />

          <TextField
            type="password"
            label="Password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button type="submit">
            Sign in
          </Button>
        </Stack>
      </form>
    </>
  )
}