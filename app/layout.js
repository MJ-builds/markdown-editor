import './globals.css'

export const metadata = {
  title: 'In-browser Markdown Editor',
  description: 'In-browser Markdown Editor - created by MJ-builds',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  )
}
