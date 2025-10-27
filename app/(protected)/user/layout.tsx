import { auth } from "@/auth";
import { Session } from "@/schema/type";
import { redirect } from "next/navigation";

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){

    const session = (await auth()) as Session | null
      if(!session?.user) return redirect('/auth/login')
    return (
    <>  
        <main className="w-full min-h-screen bg-blue-100">
            {children}
        </main>
    </> 
    )
}   