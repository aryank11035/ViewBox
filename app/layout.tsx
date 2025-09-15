import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html>
        <body className="bg-[#111111]  text-white">
          <header className="w-full h-20  flex items-center justify-center text-white fixed z-20">
          <nav className="w-[1800px] h-full border-l border-r border-b border-white/10 flex justify-between items-center px-6 md:px-10 backdrop-blur-xl">
            <h1 className="text-2xl lg:text-4xl font-bold">ViewBox</h1>
            <div className="hidden w-1/2 h-12  border border-white/10 lg:block ">
              <input className="w-full h-full outline-0 pl-3 bg-transparent  font-bold" placeholder="Search movies to save"/>
            </div>
            <div>
              <button className = "text-xl font-bold">P</button>
            </div>
          </nav>
        </header>
          {children}
        </body>
      </html>
    </>
  );
}
