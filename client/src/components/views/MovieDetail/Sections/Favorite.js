import React, { useEffect, useState } from 'react'
import { Button } from 'antd';
import Axios from 'axios';

function Favorite(props) {

    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);


    useEffect(() => {
        let variables = {
            userFrom: userFrom,
            movieId: movieId
            // movieTitle: movieTitle,
            // moviePost: moviePost,
            // movieRunTime: movieRunTime
        }

        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(res => {
                if (res.data.success) {
                    console.log("res.data.favoriteNumber : ", res.data.favoriteNumber);
                    setFavoriteNumber(res.data.favoriteNumber);
                } else {
                    alert("숫자 정보를 가져오는데 실패 했습니다.");
                }
            });


        Axios.post('/api/favorite/favorited', variables)
            .then(res => {
                if (res.data.success) {
                    console.log("res.data.favorited : ", res.data.favorited);
                    setFavorited(res.data.favorited);
                } else {
                    alert("정보를 가져오는데 실패 했습니다.");
                }
            });

    }, []);



    return (
        <div>
            <Button>{Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite