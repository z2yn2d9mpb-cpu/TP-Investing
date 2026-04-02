import './globals.css'

export const metadata = {
  title: 'TrustedPips — Consistente rendementen. Gebouwd op gecontroleerd risico.',
  description: 'TrustedPips maakt het mogelijk om te profiteren van trading via copy trading. Transparant, betrouwbaar en toegankelijk.',
  openGraph: {
    title: 'TrustedPips — Consistente rendementen',
    description: 'Kapitaal laten groeien via gestructureerd traden, risicomanagement en portfolio-gebaseerde strategieën.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
