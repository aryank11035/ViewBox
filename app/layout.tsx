
import "./globals.css";
import { Header } from "@/components/header/mainHeader";
import { Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { getSession } from "@/data/user";
import { auth } from "@/auth";
import { Session } from "@/schema/type";

const font = Space_Grotesk({
    subsets : ['latin'],
    weight : ['600']
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = (await auth()) as Session | null

  return (
  
      <html>
        <body className={cn(
          "bg-[#111111]  text-white min-h-screen selection:bg-white selection:text-[#111111]",
          font.className
          )}>
         <Header session={session}/>
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
  
  );
}
