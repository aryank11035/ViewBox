'use client'
interface LanguageSelectProps {
    languages : { code: string; name: string }[] ,
    onLanguageSelect : (lang : string) => void 
}
export default function LanguageSelect({languages , onLanguageSelect} : LanguageSelectProps){

   
    return (
     <div className="flex  gap-2 md:justify-center md:w-fit w-full flex-col md:flex-row">
        <label htmlFor="language-select" className="text-sm font-light  text-white ">
            Select Language :
        </label>
        <select 
            id="language-select"
            onChange={(e) => onLanguageSelect(e.target.value)}
            className="px-4 py-2 bg-[#111111] text-white rounded-xs border border-[rgba(255,255,255,0.2)] focus:outline-none focus:border-white/30 disabled:opacity-50 transition-opacity text-[0.6rem]"
        >   
             <option value="all">All Languages</option>
            {
                languages.map((lang : any , index : number) => (
                    <option value={lang.code} key={index}>
                        {lang.name}
                    </option>
                ))
            }
        </select>
     </div>
    )
}