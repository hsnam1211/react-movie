import { useEffect, useState } from "react";
import Movie from "../components/Movie"
import styles from "./Home.module.css"
import CircularProgress from '@mui/material/CircularProgress';

function Home() {

    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([])

    const getMovies = async() => {
        const json = await (
            await fetch(
                `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
            )
        ).json();
        setMovies(json.data.movies);
        setLoading(false);
    }

    useEffect(() => {
        getMovies()
    }, [])

    console.log(movies)

    return (
        <div className={styles.wrap}>
        {loading ? 
            <div className={styles.loading_indicator_wrap}>
                <CircularProgress className={styles.loading_indicator}/>
            </div> 
            : 
            <div className={styles.container}>{
            movies.map((movie) => (
                <div className={styles.movie__list} key={movie.id}>
                    <Movie 
                    id={movie.id}
                    coverImg={movie.medium_cover_image} 
                    genres={movie.genres} 
                    summary={movie.summary} 
                    title={movie.title}
                    year={movie.year}
                    />
                </div>
            ))}
            </div>
        }
        </div>
    )
}

export default Home;