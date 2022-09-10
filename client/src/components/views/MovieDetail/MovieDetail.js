import { Button } from 'antd';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_URL, IMAGE_BASE_URL } from '../../Config';
import { MOVIE_API_KEY } from '../../MovieApiKey';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';

function MovieDetail(props) {

    const { movieId } = useParams();
    const [Movie, setMovie] = useState([])
    useEffect(() => {

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${MOVIE_API_KEY}`;

        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${MOVIE_API_KEY}`;

        fetch(endpointInfo)
            .then(res => res.json())
            .then(data => {
                console.log("data: ", data);
                setMovie(data);

            }).catch(error => {
                console.error("에러 : ", error);
            })


    }, [])


    return (
        <div>

            {/* Header */}



            <div style={{ width: '100%', margin: '0' }}>
                {Movie &&
                    <MainImage
                        title={Movie.title}
                        text={Movie.overview}
                        image={`${IMAGE_BASE_URL}original${Movie.backdrop_path}`} />
                }
            </div>



            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                {/* Movie Info */}
                <MovieInfo movie={Movie} />



                <br />
                {/* Actors Grid */}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Button>Toggle Actor View </Button>
                </div>

            </div>





        </div>
    )
}

export default MovieDetail