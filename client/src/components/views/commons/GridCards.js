import React from 'react';
import { Col } from 'antd';
import { Link } from 'react-router-dom';
import style from './GridCards.css';

function GridCards(props) {

    if (props.landingPage) {
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative', textAlign: 'center' }} >
                    <Link to={`/movie/${props.movieId}`}>
                        <img src={props.image} alt={props.movieName} className="img"
                            style={{ width: "80%", height: "auto", maxHeight: '400px' }} />
                    </Link>
                </div>
            </Col>
        )


    } else {
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative', textAlign: 'center' }} >
                    {props.image &&
                        <img src={props.image} alt={props.characterName} className="img"
                            style={{ width: "80%", height: "auto", maxHeight: '400px' }} />
                    }
                </div>
            </Col>
        )
    }

}

export default GridCards