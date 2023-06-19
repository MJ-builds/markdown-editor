import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata = {
  title: "In-Browser Markdown Editor",
  description: "In-Browser Markdown Editor - created by MJ-builds",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-slate-200 dark:bg-[#1D1F22]">{children}</body>
      </html>
    </ClerkProvider>
  );
}
