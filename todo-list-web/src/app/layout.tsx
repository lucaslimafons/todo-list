import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import './globals.css'
import type { Metadata } from 'next'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import AuthProvider from '@/contexts/AuthContext'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppBar position="fixed" sx={{ zIndex: 2000 }}>
            <Toolbar sx={{ backgroundColor: 'background.paper' }}>
              <Typography variant="h6" noWrap component="div" color="black">
                Bizcuit TODO App
              </Typography>
            </Toolbar>
          </AppBar>

          <Container>
            <Box
              sx={{
                flexGrow: 1,
                bgcolor: 'background.default',
                mt: ['48px', '56px', '64px'],
                p: 3,
              }}
            >
              {children}
            </Box>
          </Container>
        </ThemeRegistry>
      </body>
    </html>
  )
}
