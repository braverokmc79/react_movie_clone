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

    /*
    adult: false
    backdrop_path: "/ugS5FVfCI3RV0ZwZtBV3HAV75OX.jpg"
    genre_ids: (3)[16, 878, 28]
    id: 610150
    original_language: "ja"
    original_title: "ドラゴンボール超 スーパーヒーロー"
    overview: "The Red Ribbon Army, an evil organization that was once destroyed by Goku in the past, has been reformed by a group of people who have created new and mightier Androids, Gamma 1 and Gamma 2, and seek vengeance against Goku and his family."
    popularity: 5609.525
    poster_path: "/rugyJdeoJm7cSJL1q4jBpTNbxyU.jpg"
    release_date: "2022-06-11"
    title: "Dragon Ball Super: Super Hero"
    video: false
    vote_average: 8
    vote_count: 1398
*/

    const fetchMovies = (endPoint) => {

        fetch(endPoint)
            .then(res => res.json())
            .then(data => {
                setMovies([...Movies, ...data.results]);
                setMainMovieImage(data.results[0]);
                setCurrentPage(data.page);
                console.log("data.results[0] :", data.results[0]);
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