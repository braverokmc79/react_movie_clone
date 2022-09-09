import React, { useEffect } from 'react'
import { API_URL, IMAGE_BASE_URL } from '../../Config';
import { MOVIE_API_KEY } from '../../MovieApiKey';
import { useState } from 'react';
import MainImage from './Sections/MainImage';
import GridCards from './../commons/GridCards';
import { Row } from 'antd';

function LandingPage() {

    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);

    useEffect(() => {

        const endPoint = `${API_URL}movie/popular?api_key=${MOVIE_API_KEY}&language=en-US&page=1`;
        fetch(endPoint)
            .then(res => res.json())
            .then(data => {
                setMovies(data.results);
                setMainMovieImage(data.results[0]);
                console.log(data.results);

            })
            .catch(err => {
                console.log("에러 :", err);
            });


    }, []);


    return (
        <div style={{ width: '100%', margin: '0' }}>

            {/* Main Image */}

            {MainMovieImage &&
                <MainImage
                    title={MainMovieImage.title}
                    text={MainMovieImage.overview}
                    image={`${IMAGE_BASE_URL}original${MainMovieImage.backdrop_path}`} />
            }

            <div style={{ width: '85%', margin: '1rem auth', position: "relative", left: "7.5%" }}>
                <h2>Movies by latest</h2>
                <hr />

                {/* Movie Grid Cards */}

                <Row gutter={[16, 48]} >
                    {Movies &&
                        Movies.map((movie, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    image={movie.poster_path ?
                                        `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                    movieId={movie.id}
                                    movieName={movie.original_title}
                                />

                            </React.Fragment>
                        ))

                    }

                </Row>
            </div>



            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button>Load More</button>
            </div>

        </div>
    )
}

export default LandingPage