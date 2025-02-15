import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";
import Head from "./head";
import Logout from "./components/Logout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Water Tracker",
  description: "Track your daily water intake, set goals, and build healthy hydration habits!",
};

export default function RootLayout({ children }) {
  const header =(
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
     <Link href={'/'}> 
     
     <h1 className={'text-base sm:text-lg '}>Water Tracking Website</h1>
     </Link>
     <Logout />

    </header>
  )

  const footer =(
    <footer className="p-4 sm:p-8 grid place-items-center">
<p>Built With ❤️ </p>
    </footer>
  )
  
  return (
    <html lang="en">
        <Head />
      <AuthProvider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full mx-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col `}
      >
       {header}
        {children}
     {footer}
      </body>
      </AuthProvider>
    </html>
  );
}
