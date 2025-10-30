import { BackDropImages } from "@/components/home/backdropImages"
import { BackDropSlider } from "@/components/home/backdropSilder"
import { HomeSilderSection } from "@/components/home/homeSliderSection"
import { getBackdrop } from "@/lib/helpers"

export default async function HomePage(){

    const backDropImages = await getBackdrop() as string[]
    const firstImage  = backDropImages[0]

   
    return(
        <section className="w-full pt-20  mx-auto min-h-screen">
            <HomeSilderSection backDropImages={backDropImages}/>
            <div className="w-full border-t border-b border-[rgba(255,255,255,0.1)] h-17">
                <div className="w-[1450px] border-l border-r border-[rgba(255,255,255,0.1)] h-full mx-auto">

                </div>
            </div>
          
                <div className="w-[1450px] border-l border-r border-[rgba(255,255,255,0.1)] min-h-screen mx-auto">

                </div>
           
        </section>
    )
}   