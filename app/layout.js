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
  const header = (
    <header className="p-4 sm:p-8 bg-white shadow-md flex items-center justify-between gap-4">
      <Link href="/" className="flex items-center"> {/* Make Link a flex container */}
        <span className="text-2xl sm:text-3xl font-bold text-indigo-700 mr-2">💧</span> {/* Water drop icon */}
        <h1 className="text-xl sm:text-2xl font-extrabold text-indigo-700 tracking-tight">AquaTrack</h1> {/* App name */}
      </Link>
      <Logout />
    </header>
  );

  const footer = (
    <footer className="p-4 sm:p-8 bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-center shadow-lg">
      <div className="max-w-7xl mx-auto"> {/* Optional: Center content and set max width */}
        <p className="font-semibold text-lg sm:text-xl tracking-wide">
          Stay Hydrated, Stay Healthy 💧 | Built with ❤️ for a Better You
        </p>
        <p className="text-sm sm:text-base mt-2 opacity-70">
          © {new Date().getFullYear()} 
        </p>
      </div>
    </footer>
  );
  
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
