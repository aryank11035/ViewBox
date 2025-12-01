
import "./globals.css";
import { Header } from "@/components/header/mainHeader";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/footer/mainFooter";
import { IBM_Plex_Mono } from "next/font/google";
import { auth } from "@/auth";


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
        <head>
          <link rel="icon" href="/whiteLogo.svg" type="image/x-icon"></link>
        <title>ViewBox</title>
      </head>
        <body className={cn(
          "bg-[#111111]  text-white min-h-screen selection:bg-white selection:text-green-600 tracking-normal  ",
          font.className
          )}>
            
              <Header session={session}/>
              <main className="w-full relative  min-h-screen mx-auto">
                {children}
              </main>
              <Footer/>
          
        </body>
      </html>
  
  );
}
