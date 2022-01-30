import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Detail() {
    const {id} = useParams();
    
    const [movieDetail, setMovieDetail] = useState([])

    const getMovieDetail = async() => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json()
        setMovieDetail(json)
    }

    useEffect(() => {
        getMovieDetail()
    },[])

    console.log(movieDetail)
    return <div>Detail</div>
}
export default Detail