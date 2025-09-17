import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html>
        <body className="bg-[#111111]  text-white min-h-screen">
          <header className="w-full h-20  flex items-center justify-center text-white fixed z-20 border-b border-b-white/10  backdrop-blur-xl">
        
          <nav className="w-[1800px] h-full border-l border-r border-white/10 flex justify-between items-center px-6 md:px-10 backdrop-blur-xl">
            <h1 className="text-2xl lg:text-4xl font-bold cursor-pointer">ViewBox</h1>
            <div className="flex gap-5 text-xl font-bold">
              <Link href='/search'><p>S</p></Link>
              <button>P</button>
            </div>
          </nav>
        </header>
        <main className="w-full relative  ">
        <div className="hidden md:block 
                     
                      mt-20
                      absolute inset-0 
                      bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.1)_0,rgba(255,255,255,0.1)_1px,transparent_0,transparent_50%)]
                      bg-[size:10px_10px] 
                      bg-fixed">
                  </div>
          {children}
          </main>
          <footer className="w-full h-20 border-t border-t-white/10">
            <div className="max-w-[1800px] border-r border-l border-white/10 h-full mx-auto flex text-white/20 justify-between px-6 font-medium items-center">
              <p >~Aryan Kate</p>
              <p >Source Code</p>
            </div>
          </footer>
        </body>
      </html>
    </>
  );
}
