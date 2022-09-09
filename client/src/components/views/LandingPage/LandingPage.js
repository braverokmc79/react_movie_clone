import React, { useEffect } from 'react'
import { API_URL, IMAGE_BASE_URL } from '../../Config';
import { MOVIE_API_KEY } from '../../MovieApiKey';
import { useState } from 'react';
import MainImage from './Sections/MainImage';

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
                {
                    Movies.map((movie, index) => (
                        <div key={index}>
                            <img src={`${IMAGE_BASE_URL}w500${movie.backdrop_path}`} />
                        </div>
                    ))

                }

                {/* Movie Grid Cards */}
            </div>



            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button>Load More</button>
            </div>

        </div>
    )
}

export default LandingPage