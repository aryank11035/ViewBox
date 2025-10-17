import { BackDropImages } from "@/components/home/backdropImages"
import { BackDropSlider } from "@/components/home/backdropSilder"
import { HomeSilderSection } from "@/components/home/homeSliderSection"
import { getBackdrop } from "@/lib/helpers"

export default async function HomePage(){

    const backDropImages = await getBackdrop() as string[]
    const firstImage  = backDropImages[0]

   console.log(backDropImages)
    return(
        <section className="w-full pt-20 ">
            <HomeSilderSection backDropImages={backDropImages}/>
        </section>
    )
}   