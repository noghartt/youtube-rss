import { RootProvider } from './provider';

export const metadata = {
  title: 'YouTube RSS',
  description: 'Get the RSS feed of any YouTube channel.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  )
}
