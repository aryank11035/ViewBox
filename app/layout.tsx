
import "./globals.css";
import { Header } from "@/components/header/mainHeader";
import { Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/footer/mainFooter";
import { IBM_Plex_Mono } from "next/font/google";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

const font = IBM_Plex_Mono({
    subsets : ['latin'],
    weight : ['300', '400', '500', '600', '700']
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()

  return (
  
      <html>
        <body className={cn(
          "bg-[#111111]  text-white min-h-screen selection:bg-white selection:text-green-600 tracking-normal  ",
          font.className
          )}>
            {/* <SessionProvider session={session}> */}
              <Header session={session}/>
              <main className="w-full relative  min-h-screen mx-auto">
                {children}
              </main>
              <Footer/>
            {/* </SessionProvider> */}
        </body>
      </html>
  
  );
}
