"use client";

import { logout } from "@/services/auth";
import { Stack, Typography } from "@mui/material"
import { useEffect } from "react";

export default function SignIn() {
  useEffect(() => {
    logout()
    window.location.href = 'sign-in'
  }, [])

  return (
    <>
      <Stack>
        <Typography variant="h3">
          Signing out... bye!
        </Typography>
      </Stack>
    </>
  )
}