"use client";

import { SignUpInput, signUpInputSchema } from "@/schemas/auth"
import { signUp } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod"
import { Alert, Button, Stack, TextField, Typography } from "@mui/material"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form"

export default function SignUp() {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpInputSchema)
  })

  const onSubmit = async (data: SignUpInput) => {
    setError(null)
    try {
      await signUp(data)

      router.push('/tasks')
    } catch (error) {
      setError(error.message)
    }
  }

  const onError = (error: FieldErrors<SignUpInput>) => console.error(error)
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
            Sign up
          </Typography>

          <TextField
            label="Name"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

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
            Sign up
          </Button>
        </Stack>
      </form>
    </>
  )
}