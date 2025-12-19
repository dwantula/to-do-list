import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lista Zadań',
  description: 'Aplikacja do zarządzania zadaniami - Todo List',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  )
}
