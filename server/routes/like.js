const express = require('express');
const router = express.Router();
const { Like } = require('../models/Like');
const { Dislike } = require('../models/Dislike');


//======================================
//      Like
//======================================

//좋아요 가져오기
router.post("/getLikes", (req, res) => {
    let variable = {}
    if (req.body.variable) {
        variable = { movieId: req.body.movieId }
    } else {
        variable = { commentId: req.body.commentId }
    }

    Like.find(variable)
        .exec((err, likes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, likes })
        })
});


//싫어요 가져오기
router.post("/getDisLikes", (req, res) => {
    let variable = {}
    if (req.body.variable) {
        variable = { movieId: req.body.movieId }
    } else {
        variable = { commentId: req.body.commentId }
    }

    Dislike.find(variable)
        .exec((err, dislikes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, dislikes })
        })
});



//좋아요 증가처리
router.post("/upLike", (req, res) => {
    let variable = {}

    if (req.body.movieId) {
        variable = { variable: req.body.movieId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    const like = new Like(variable);

    //1.Like collection 좋아요  정보 추가
    like.save((err, likeResult) => {
        if (err) return res.json({ success: false, err });


        //2. 만약에 Dislike 가 이미 클릭 되어 있다면, Dislike 을 1 줄여 준다.
        //여기서는 삭제 처리
        Dislike.findOneAndDelete(variable)
            .exec((err, disLikeResult) => {
                if (err) return res.status(400).send(err);
                res.status(200).json({ success: true });
            })
    })
})


//좋아요 취소처리
router.post("/unLike", (req, res) => {

    let variable = {}

    if (req.body.movieId) {
        variable = { variable: req.body.movieId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({ success: true })
        })

});



//싫어요 감소 처리
router.post("/unDislike", (req, res) => {

    let variable = {}

    if (req.body.movieId) {
        variable = { variable: req.body.movieId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    Dislike.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({ success: true })
        });

});


//싫어요 증가 처리
router.post("/upDislike", (req, res) => {

    let variable = {}

    if (req.body.movieId) {
        variable = { variable: req.body.movieId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    const dislike = new Dislike(variable)

    //1.Dislike collection 에다가 클릭 정보를 넣는다.
    dislike.save((err, dislikeResult) => {
        if (err) return res.json({ success: false, err });

        //2. 만약에 Like 가 이미 클릭이 되었다면,  해당 정보가  존재하면 삭제 처리 Like 1 감소
        Like.findOneAndDelete(variable)
            .exec((err, likeResult) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true })
            })

    })

});


module.exports = router;