import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import styles from "./Movie.module.css"

function Movie({id, coverImg, title, summary, genres, year}) {
    return (
        <div className={styles.movie__content}>
            <img className={styles.movie__cover_img} src={coverImg} alt={title}/>
            <h2 className={styles.movie__title}>
                <Link to={`/movie/${id}`}>{title}</Link>
            </h2>
            <div className={styles.movie__genres}>
                {genres.map((g, index) => (
                    index == 0 ? 
                        <span className={styles.movie__genres_word} key={g}>{g}</span>:
                        <span className={styles.movie__genres_word} key={g}> ・ {g}</span>
                ))}
                <span className={styles.movie__genres_word}> ・ {year}</span>
            </div>
            {summary.length > 235 ? 
                <p className={styles.movie__summary}>{summary.slice(0,235)}...</p> : 
                <p className={styles.movie__summary}>{summary}</p>
            }
        </div>
    );
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    coverImg: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired, 
    summary: PropTypes.string.isRequired, 
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Movie;
