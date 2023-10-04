"use client";

import { Button, Container, Stack, Typography } from "@mui/material"
import { useRouter } from "next/navigation";

export default function Welcome() {
  const router = useRouter()


  return (
    <>
      <Container>
        <Typography mb={5} variant="h3">
          Welcome!
        </Typography>

        <Stack spacing={3}>
          <Button variant="contained" onClick={() => router.push('/sign-in')}>Sign in</Button>
          <Button variant="outlined" onClick={() => router.push('/sign-up')}>Sign up</Button>
        </Stack>
      </Container>
    </>
  )
}