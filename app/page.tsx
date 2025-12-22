import fs from 'fs/promises';
import path from 'path';

import UpdatedSection from "@/components/sections/updatedSection";
import { LandingPage } from "@/components/sections/landingPage";
import { InfoCardSection } from "@/components/sections/infoCardSection";


async function getMoviesFromJSON() {
  const filePath = path.join(process.cwd(), 'topMovies.json');
  const fileData = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(fileData);
}


export default async function Page() {
    
   const yourMedia = await getMoviesFromJSON();
  return (

      <>

        <section className="max-w-[1450px]  mx-auto relative bg-[#111111] border-l border-r border-white/10 flex items-center justify-center flex-col pt-20 ">
           
            <LandingPage/>
            
        </section>
        
        <section className="w-full mx-auto  bg-black/30 border-t border-[rgba(255,255,255,0.1)] ">
       
          
              <UpdatedSection mediaData={yourMedia} />
        </section>

        <section className="bg-[#111111] w-full mx-auto border-t border-white/10 ">
          <InfoCardSection />
        </section>
      </>
   
    
  )
}

// #111111  #F9F4E