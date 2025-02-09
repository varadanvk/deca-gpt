import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DECA GPT',
  description: 'Deca-GPT is a tool that helps students prepare for the DECA role-play competition.',
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
