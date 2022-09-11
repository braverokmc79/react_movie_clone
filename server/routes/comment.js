const express = require('express');
const router = express.Router();
const { Comment } = require('../models/Comment');


//======================================
//      Comment
//======================================


//댓글 등록 처리
router.post('/saveComment', (req, res) => {
    const comment = new Comment(req.body);
    comment.save((err, doc) => {
        if (err) return res.status(400).send(err);

        //방금 등록한 글 반환처리
        Comment.find({ '_id': doc._id })
            .populate("writer")
            .exec((err, result) => {
                if (err) return res.status(400).send(err);
                res.status(200).json({ success: true, result });
            })
    });

});

//댓글 목록 가져오기
router.post('/getComments', (req, res) => {

    Comment.find({ "movieId": req.body.movieId })
        .populate("writer")
        .exec((err, comments) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, comments });
        });
})





module.exports = router;