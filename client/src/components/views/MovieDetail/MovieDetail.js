import { Button, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_URL, IMAGE_BASE_URL } from '../../Config';
import { MOVIE_API_KEY } from '../../MovieApiKey';
import GridCards from '../commons/GridCards';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import Favorite from './Sections/Favorite';
import { useSelector } from 'react-redux';


function MovieDetail(props) {

    const { movieId } = useParams();
    const [Movie, setMovie] = useState([]);
    const [Casts, setCasts] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);
    const user = useSelector(state => state.user)
    useEffect(() => {

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${MOVIE_API_KEY}`;

        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${MOVIE_API_KEY}`;

        fetch(endpointInfo)
            .then(res => res.json())
            .then(data => {
                console.log("endpointInfo: ", data);
                setMovie(data);
            }).catch(error => {
                console.error("에러 : ", error);
            })


        fetch(endpointCrew)
            .then(res => res.json())
            .then(data => {
                console.log("endpointCrew  - cast: ", data.cast);
                setCasts(data.cast);
            }).catch(error => {
                console.error("에러 : ", error);
            })

    }, [])


    return (
        <div>

            {/* Header */}



            <div style={{ width: '100%', margin: '0' }}>
                {Movie && Movie.backdrop_path !== undefined &&
                    <MainImage
                        title={Movie.title}
                        text={Movie.overview}
                        image={`${IMAGE_BASE_URL}original/${Movie.backdrop_path}`} />
                }
            </div>



            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                {user.userData && user.userData.isAuth &&
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
                        <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem("userId")} />
                    </div>
                }


                {/* Movie Info */}
                <MovieInfo movie={Movie} />



                <br />
                {/* Actors Grid */}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Button onClick={() => (setActorToggle(!ActorToggle))}>
                        Toggle Actor View
                    </Button>
                </div>

                {/* 
                console.log("endpointCrew  - cast: ", data.cast);
                adult: false
                cast_id: 1
                character: ""
                credit_id: "5f8f1cec383df20034aab300"
                gender: 2
                id: 134
                known_for_department: "Acting"
                name: "Jamie Foxx"
                order: 0
                original_name: "Jamie Foxx"
                popularity: 33.058
                profile_path: "/hPwCMEq6jLAidsXAX5BfoYgIfg2.jpg" */}

                {ActorToggle &&
                    <Row gutter={[16, 48]} >
                        {Casts &&
                            Casts.map((cast, index) => (
                                <React.Fragment key={index}>
                                    {cast.profile_path &&
                                        <GridCards path={cast.profile_path}
                                            image={cast.profile_path ?
                                                `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                            characterName={cast.name}
                                        />
                                    }
                                </React.Fragment>
                            ))

                        }
                    </Row>
                }

            </div>


        </div>
    )
}

export default MovieDetail