import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "OOO의 포트폴리오",
  description: "Next.js로 만든 첫 번째 작품",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <header className="border-b border-border bg-background text-foreground">
            <nav className="mx-auto flex w-full max-w-5xl items-center justify-between gap-6 px-6 py-4">
              <div className="flex items-center gap-6">
                <Link className="text-sm font-medium transition-opacity hover:opacity-80" href="/">
                  Main
                </Link>
                <Link className="text-sm font-medium transition-opacity hover:opacity-80" href="/home">
                  Home
                </Link>
                <Link className="text-sm font-medium transition-opacity hover:opacity-80" href="/about">
                  About
                </Link>
                <Link className="text-sm font-medium transition-opacity hover:opacity-80" href="/shadcntest">
                  shadcnTest
                </Link>
                <Link className="text-sm font-medium transition-opacity hover:opacity-80" href="/profile">
                  Profile
                </Link>
              </div>
              
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <Link
                  className="rounded-md border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
                  href="/login"
                >
                  Login
                </Link>
              </div>
            </nav>
          </header>
          <div className="flex-1">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
