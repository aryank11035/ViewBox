import { BsExclamationTriangle } from "react-icons/bs";

interface FormErrorProps {
    error ?: string
}

export const FormError = ({
    error
} : FormErrorProps) => {
    if(!error) return null

    return (
        <div className="bg-destructive/50 p-3 rounded-none flex items-center gap-x-2 text-sm text-destructive">
            <BsExclamationTriangle className="h-4 w-4"/>
            <p>{error}</p>
        </div>
    )
}