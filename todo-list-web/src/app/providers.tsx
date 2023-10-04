"use client"

import AuthProvider from "@/contexts/AuthContext"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { nl } from "date-fns/locale"

export const Providers = ({ children }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={nl}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </LocalizationProvider>
  )
}