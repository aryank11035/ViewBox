


'use client'
import { Card,CardContent,CardFooter,CardHeader } from "../ui/card"
import { BackButton } from "./backButton"
import { Header } from "./header"

interface CardWrapperProps {
    children : React.ReactNode
    headerLabel : string
    backButtonLabel : string
    backButtonHref : string
    showSocial ?:boolean
}


export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial
} : CardWrapperProps) => {
    return (
        <Card className=" backdrop-blur-2xl text-white border-1 border-[rgba(255,255,255,0.1)]  lg:translate-x-2 lg:-translate-y-2 bg-transparent rounded-xs">
            <CardHeader>
                <Header label={headerLabel}/>
            </CardHeader>
            <CardContent>
                {children}  
            </CardContent>
            
            <CardFooter>
                <BackButton 
                    href={backButtonHref}
                    label={backButtonLabel}
                />
            </CardFooter>
        </Card>
    )
}