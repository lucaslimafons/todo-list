"use client"

import { isLoggedIn } from "@/services/auth";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

export type AuthContextProperties = {
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextProperties | null>(null)

const AuthProvider = ({
  children
}: PropsWithChildren<unknown>) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  
  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.href = '/sign-in'
    }
  }, [])

  return <AuthContext.Provider
    value={{
      isLoading
    }}
  >
    {children}
  </AuthContext.Provider>
}

export default AuthProvider