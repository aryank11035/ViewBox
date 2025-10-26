import { BsCheckCircle } from "react-icons/bs";

interface FormErrorProps {
    message ?: string
}

export const FormSucess = ({
    message
} : FormErrorProps) => {
    if(!message) return null

    return (
        <div className="bg-emerald-500/15 p-3 rounded-xs flex items-center gap-x-2 text-sm text-emerald-500">
            <BsCheckCircle className="h-4 w-4"/>
            <p>{message}</p>
        </div>
    )
}