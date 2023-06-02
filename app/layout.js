import './globals.css'

export const metadata = {
  title: 'In-Browser Markdown Editor',
  description: 'In-Browser Markdown Editor - created by MJ-builds',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  )
}
