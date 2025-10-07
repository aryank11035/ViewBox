import { Space_Grotesk } from "next/font/google";

import { cn } from "@/lib/utils";


const font = Space_Grotesk({
    subsets : ['latin'],
    weight : ['600']
})

interface HeaderProps {
    label : string
}

export const Header = ({
    label
} : HeaderProps) => {
    return  (
        <div className="">
            <h1 className={cn(
                'text-3xl font-semibold text-center',
                font.className
            )}>
                {label}
            </h1>
            
        </div>
    )
}