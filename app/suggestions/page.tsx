import { SuggestFrom } from "@/components/suggestions/suggestFrom";

export default async function SuggestionsPages(){
    return (
        <section className="max-w-[1450px] border-l border-r border-[rgba(255,255,255,0.1)] mx-auto min-h-screen pt-30 px-2">
            <SuggestFrom />
        </section>
    )
}