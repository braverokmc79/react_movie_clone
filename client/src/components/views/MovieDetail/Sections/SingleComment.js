import React from 'react'
import { Comment as AntdComment, Avatar, Button } from 'antd';
import { useState } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import LikeDislikes from './LikeDislikes';


function SingleComment(props) {
    const [OpenReply, setOpenReply] = useState(false);

    const user = useSelector(state => state.user);
    const [CommentValue, setCommentValue] = useState("");



    const onClickRplyOpen = () => {
        setOpenReply(!OpenReply);
    }

    const actions = [
        <LikeDislikes userId={localStorage.getItem("userId")} commentId={props.comment._id} />,
        <span style={{ fontSize: '12px', margin: 0, color: 'black', cursor: "pointer", fontWeight: "bold" }}
            onClick={onClickRplyOpen} key="comment-basic-reply-to">댓글작성</span>
    ]

    const onSubmit = (event) => {
        event.preventDefault();
        if (!user.userData._id) {
            alert("댓글은 로그인 후 작성 가능합니다.");
            return;
        }
        console.log("CommentValue : ", CommentValue);
        if (!CommentValue) {
            alert("내용을 입력해 주세요.");
            return;
        }

        const variable = {
            content: CommentValue,
            writer: user.userData._id,
            movieId: props.comment.movieId,
            responseTo: props.comment._id
        }

        Axios.post("/api/comment/saveComment", variable)
            .then(res => {
                if (res.data.success) {
                    setCommentValue("");
                    props.refreshFunction(res.data.result);
                    setOpenReply(false);
                } else {
                    alert("댓글 저장에 실패했습니다.");
                }
            })
    }

    return (
        <div>
            <AntdComment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt={props.comment.writer.name} />}
                content={<p>{props.comment.content}</p>}
            />

            {OpenReply &&
                <form style={{ display: 'flex', marginBottom: 30 }} onSubmit={onSubmit} >
                    <textarea style={{ width: "100%", borderRadius: '5px' }}
                        onChange={(e) => setCommentValue(e.target.value)}
                        value={CommentValue}
                        placeholder='코멘트를 작성해 주세요.'
                    >
                    </textarea>
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}
                    >댓글작성하기</Button>
                </form>
            }

        </div >
    )
}

export default SingleComment