import React, { useEffect, useState } from 'react'
import './FavoritePage.css';
import Axios from 'axios';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../../Config';

function FavoritePage() {
    const [Favorites, setFavorites] = useState([]);

    useEffect(() => {
        Axios.post("/api/favorite/getFavoritedMovie", { userFrom: localStorage.getItem('userId') })
            .then(res => {
                if (res.data.success) {
                    console.log("좋아하는 영화 목록 :", res.data.favorites);
                    setFavorites(res.data.favorites);
                } else {
                    alert("영화 정보를 가져오는데 실패 했습니다.");
                }
            }).catch(err => {
                console.error("에러 :", err);
            });

    }, [])

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2>좋아하는 영화</h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>영화 썸네일</th>
                        <th>영화 제목</th>
                        <th>영화 상영 시간</th>
                        <th>좋아하는 영화 삭제</th>
                    </tr>
                </thead>
                {/* 
                createdAt: "2022-09-10T08:57:10.377Z"
                    movieId: "539681"
                    moviePost: "/xfNHRI2f5kHGvogxLd0C5sB90L7.jpg"
                    movieRunTime: "105"
                    movieTitle: "DC League of Super-Pets"
                    updatedAt: "2022-09-10T08:57:10.377Z"
                    userFrom: "631b134dc2a05ff2c6388c32"
                    __v: 0
                    _id: "631c5166f25fe1c926436a66"
                */}
                <tbody>
                    {
                        Favorites.map((favorite, index) => (
                            <tr key={index}>
                                <td>
                                    <Link to={`/movie/${favorite.movieId}`}>
                                        <img src={`${IMAGE_BASE_URL}w200${favorite.moviePost}`} alt={favorite.movieTitle} />
                                    </Link>
                                </td>
                                <td>{favorite.movieTitle}</td>
                                <td>{favorite.movieRunTime}</td>
                                <td><Button type="danger">삭제</Button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    )
}

export default FavoritePage