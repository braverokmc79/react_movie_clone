import React, { useEffect } from 'react'
import { Button } from 'antd';
import Axios from 'axios';

function Favorite(props) {

    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    useEffect(() => {

        let variables = {
            // userFrom: userFrom,
            movieId: movieId,
            // movieTitle: movieTitle,
            // moviePost: moviePost,
            // movieRunTime: movieRunTime
        }

        console.log("variables : ", variables);

        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(res => {
                if (res.data.success) {
                    console.log("res.data.favoriteNumber : ", res.data.favoriteNumber);
                } else {
                    alert("숫자 정보를 가져오는데 실패 했습니다.");
                }
            });
    }, []);



    return (
        <div>
            <Button>Favorite</Button>
        </div>
    )
}

export default Favorite