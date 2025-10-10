
import "./globals.css";
import { Header } from "@/components/header/mainHeader";
import { Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { getSession } from "@/data/user";
import { auth } from "@/auth";
import { Session } from "@/schema/type";
import { Footer } from "@/components/footer/mainFooter";

const font = Space_Grotesk({
    subsets : ['latin'],
    weight : ['300', '400', '500', '600', '700']
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
          "bg-[#111111]  text-white min-h-screen selection:bg-white selection:text-green-600",
          font.className
          )}>
         <Header session={session}/>
        <main className="max-w-[1700px] relative  min-h-screen mx-auto">
        {/* <div className="hidden md:block 
                      border-l
                      border-r
                      border-[rgba(255,255,255,0.1)]
                      mt-20
                      absolute inset-0 
                      bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.1)_0,rgba(255,255,255,0.1)_1px,transparent_0,transparent_50%)]
                      bg-[size:10px_10px] 
                      bg-fixed">
                  </div> */}
          {children}
          </main>
          <Footer/>
        </body>
      </html>
  
  );
}
