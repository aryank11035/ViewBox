' use client'

import Link from "next/link"
import { Button } from "../ui/button"


interface BackButtonProps{
    href : string 
    label : string
}

export const BackButton = ({
    href,
    label
} : BackButtonProps) => {
    return (
        <Button variant='link' className="text-white text-center w-full" size='sm'>
            <Link href={href} >
                {label}
            </Link>
        </Button>
    )
}