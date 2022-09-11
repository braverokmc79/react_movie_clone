import React from 'react'
import { useState, useEffect } from 'react';
import SingleComment from './SingleComment';

function ReplyComment(props) {
    const [ChildCommentNumber, setChildCommentNumber] = useState(0);
    const [OpenReplyComments, setOpenReplyComments] = useState(false);


    useEffect(() => {
        let commentNumber = 0;

        props.commentLists.map((comment) => {
            if (comment.responseTo === props.parentCommentId) {
                commentNumber++;
            }
        })
        setChildCommentNumber(commentNumber);

    }, [props.commentLists])

    const renderReplyComment = (parentCommentId) => {
        return props.commentLists.map((comment, index) => (
            <React.Fragment key={index}>
                {
                    comment.responseTo === parentCommentId &&
                    <div style={{ width: "80%", marginLeft: '40px', padding: "10px" }}>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} />
                        {/* 댓글이 존재하면 ReplyComment 가 계속 반복 호출 처리 되어 진다. */}
                        <ReplyComment parentCommentId={comment._id} commentLists={props.commentLists} refreshFunction={props.refreshFunction} />
                    </div>
                }
            </React.Fragment>
        ))
    }
    const onHandleChange = () => {
        setOpenReplyComments(!OpenReplyComments);
    }

    return (
        <div>

            {ChildCommentNumber > 0 &&
                <p style={{ fontSize: '14px', margin: 0, color: 'black', cursor: "pointer", fontWeight: "bold" }} onClick={onHandleChange}>
                    {!OpenReplyComments ? '댓글보기' : '댓글숨기기'} ({ChildCommentNumber})
                </p>
            }

            {OpenReplyComments &&
                renderReplyComment(props.parentCommentId)
            }

        </div >
    )
}

export default ReplyComment