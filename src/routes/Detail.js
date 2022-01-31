import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Detail.module.css"
import { style } from "@mui/system";
import Star from '@material-ui/icons/Star';
import ThumbUp from '@material-ui/icons/ThumbUp';

function Detail() {
    const {id} = useParams();
    
    const [movieDetail, setMovieDetail] = useState([]);
    const [loading, setLoading] = useState(true);

    const getMovieDetail = async() => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json()
        setMovieDetail(json)
        setLoading(false)
    }

    useEffect(() => {
        getMovieDetail() 
    },[])

    console.log(movieDetail)
    return (
        <div>
            {loading ? 
                <h1>Loading...</h1>
                : 
                <>
                    <img className={styles.movie__detail_background} src={movieDetail.data.movie.background_image_original}></img>
                    <div className={styles.movie__detail_background_gradient}></div>
                </>
            }
            <div className={styles.wrap}>
                <div className={styles.container}>
                {loading ? 
                    null: 
                    <>
                        <img className={styles.movie__detail_img} src={movieDetail.data.movie.medium_cover_image}></img>
                        <div className={styles.movie__detail_container}>
                            <div className={styles.movie__detail_title_container}>
                                <h2 className={styles.movie__detail_title}>{movieDetail.data.movie.title}</h2>
                                <div className={styles.movie__detail_title_long}>{movieDetail.data.movie.title_long}</div>
                            </div>
                            <div className={styles.movie__detail_runtime}>Runtime : {movieDetail.data.movie.runtime} minutes</div>
                            <div className={styles.movie__detail_thums_rating}>
                                <div className={styles.movie__detail_rating}>
                                    <Star style={{fontSize: 33}}/><span className={styles.movie__detail_star}>{movieDetail.data.movie.rating}</span>
                                </div>
                                <div className={styles.movie__detail_thums}>
                                    <ThumbUp style={{fontSize: 31}}/><span className={styles.movie__detail_star}>{movieDetail.data.movie.like_count}</span>
                                </div>
                            </div>
                            <div className={styles.movie__detail_genres}>
                            {movieDetail.data.movie.genres.map((g, index) => (
                                index == 0 ? 
                                    <span className={styles.movie__detail_genres_text} key={g}>{g}</span>:
                                    <span className={styles.movie__detail_genres_text} key={g}> ・ {g}</span>
                            ))}
                            </div>
                            <div className={styles.movie__detail_description_wrap}>
                                <div className={styles.movie__detail_description_container}>
                                    <div className={styles.movie__detail_description_intro}>{movieDetail.data.movie.description_intro}</div>
                                </div>
                            </div>
                            <div className={styles.footer}></div>
                        </div>
                    </>
                }
                </div>
            </div>
        </div>
    )
}
export default Detail