import React from 'react';
import { Col } from 'antd';
import { Link } from 'react-router-dom';
import style from './GridCards.css';

function GridCards(props) {
    return (
        <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }} >
                <Link to={`/movie/${props.movieId}`}>
                    <img src={props.image} alt={props.movieName} className="img"
                        style={{
                            width: "80%",
                            height: "auto"
                        }}
                    />
                </Link>
            </div>
        </Col>
    )
}

export default GridCards