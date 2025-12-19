import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Task List',
  description: 'Task management application - Todo List',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
