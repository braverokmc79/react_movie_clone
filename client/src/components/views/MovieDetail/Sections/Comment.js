import { Button } from 'antd'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

function Comment(props) {

    const user = useSelector(state => state.user);
    const [CommentValue, setCommentValue] = useState();
    const [Comments, setComments] = useState([]);


    useEffect(() => {
        const variable = {
            movieId: props.movieId
        }

        //댓글 목록 가져오기
        Axios.post("/api/comment/getComments", variable)
            .then(res => {
                if (res.data.success) {
                    console.log("res.data.comments   :", res.data.comments);
                    setComments(res.data.comments);
                } else {
                    alert("댓글 목록을 가져오는데 실패했습니다.");
                }
            });

    }, [])


    const handleClick = (event) => {
        setCommentValue(event.currentTarget.value);
    }

    const refreshFunction = (newComment) => {
        setComments(Comments.concat(newComment));
    }

    const onsubmit = (event) => {
        event.preventDefault();
        if (!user.userData._id) {
            alert("댓글은 로그인 후 작성 가능합니다.");
            return;
        }
        if (!CommentValue) {
            alert("내용을 입력해 주세요.");
            return;
        }
        const variable = {
            content: CommentValue,
            writer: user.userData._id,
            movieId: props.movieId
        }

        Axios.post("/api/comment/saveComment", variable)
            .then(res => {
                if (res.data.success) {
                    setCommentValue("");
                    refreshFunction(res.data.result);
                } else {
                    alert("댓글 저장에 실패했습니다.");
                }
            })
    }

    return (
        <div>
            <br />
            <hr style={{ marginTop: 50 }} />
            <h3 style={{ fontSize: "1.8rem" }}>{props.movie.title} 에 대한 의견을 공유해주세요.</h3>

            {/* Comment Lists */}

            {
                Comments.length === 0 &&
                <div style={{ height: 150, position: "relative" }}><span style={{
                    top: "30%",
                    position: "absolute",
                    left: "40%",
                    fontSize: "1.2rem"
                }} > 이 영화에 대한 당신의 생각을 가장 먼저 공유해 보세요.</span></div>
            }

            {
                Comments && Comments.map((comment, index) => (
                    (!comment.responseTo &&
                        <React.Fragment key={index}>
                            <SingleComment comment={comment} refreshFunction={refreshFunction} />
                            <ReplyComment parentCommentId={comment._id} commentLists={Comments} refreshFunction={refreshFunction} />
                        </React.Fragment>
                    )
                ))
            }




            {/* Root Comment Form */}

            <form style={{ display: 'flex', marginTop: 50 }}>
                <textarea style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick} value={CommentValue} placeholder='댓글을 작성해 주세요.'></textarea>
                <br />
                <Button style={{ width: '20%', height: "52px" }} onClick={onsubmit}>댓글작성</Button>

            </form>
        </div >
    )
}

export default Comment