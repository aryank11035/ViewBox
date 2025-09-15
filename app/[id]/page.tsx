import { getMovieById, getMovieByImdbId } from "../ts/getData";

type Params = {
    params: {
      id: number
    }
  }
  
  export default async function IdPage({ params }: Params) {
    const { id } = await params;
    const {imdb_id} = await getMovieById(id)
    const showData = await getMovieByImdbId(imdb_id)
    console.log(showData)
    return (
    <>
      <section className="max-w-[1800px] min-h-screen mx-auto border-l border-r  border-white/10  pt-20">
        <img src={showData.primaryImage.url} />
       
      </section>
    </>
    )
  }
  