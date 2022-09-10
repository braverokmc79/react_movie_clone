import React, { useEffect } from 'react'
import { API_URL, IMAGE_BASE_URL } from '../../Config';
import { MOVIE_API_KEY } from '../../MovieApiKey';
import { useState } from 'react';
import MainImage from './Sections/MainImage';
import GridCards from './../commons/GridCards';
import { Row, Button } from 'antd';

function LandingPage() {

    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);
    const [CurrentPage, setCurrentPage] = useState(0);

    useEffect(() => {

        const endPoint = `${API_URL}movie/popular?api_key=${MOVIE_API_KEY}&language=en-US&page=1`;
        fetchMovies(endPoint);

    }, []);


    const fetchMovies = (endPoint) => {

        fetch(endPoint)
            .then(res => res.json())
            .then(data => {
                setMovies([...Movies, ...data.results]);
                setMainMovieImage(data.results[0]);
                setCurrentPage(data.page);

            })
            .catch(err => {
                console.log("에러 :", err);
            });

    }


    const loadMoreItems = () => {
        const endPoint = `${API_URL}movie/popular?api_key=${MOVIE_API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endPoint);
    }


    return (
        <>
            <div style={{ width: '100%', margin: '0' }}>
                {MainMovieImage &&
                    <MainImage
                        title={MainMovieImage.title}
                        text={MainMovieImage.overview}
                        image={`${IMAGE_BASE_URL}original${MainMovieImage.backdrop_path}`} />
                }
            </div>

            <div style={{ width: '100%', margin: '0', padding: '10px 5%' }}>


                <div style={{ width: '100%', margin: '1rem auth', }}>
                    <h2>Movies by latest</h2>
                    <hr />

                    {/* Movie Grid Cards */}

                    <Row gutter={[16, 48]} >
                        {Movies &&
                            Movies.map((movie, index) => (
                                <React.Fragment key={index}>
                                    {movie.poster_path &&
                                        <GridCards path={movie.poster_path}
                                            landingPage={true}
                                            image={movie.poster_path ?
                                                `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                            movieId={movie.id}
                                            movieName={movie.original_title}
                                        />
                                    }
                                </React.Fragment>
                            ))

                        }
                    </Row>


                    <div style={{ textAlign: 'center', margin: "100px 0" }}>
                        <Button onClick={loadMoreItems}>더보기</Button>
                    </div>

                </div>



            </div>
        </>
    )
}

export default LandingPage