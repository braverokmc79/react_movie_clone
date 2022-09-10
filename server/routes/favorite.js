const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");


//'좋아요' 숫자 갯수 가져오기
router.post("/favoriteNumber", (req, res) => {

    //1.mongoDD 에서 movieId 에 대한 정보를 가져오기
    Favorite.find({ "movieId": req.body.movieId })
        .exec((err, info) => {
            if (err) return res.status(400).send(err);

            //2.좋아요를한  유저정보 길이 반환
            res.status(200).json({ success: true, favoriteNumber: info.length });
        })
});


//내가 좋아를 했는지 여부 가져오기
router.post("/favorited", (req, res) => {

    //1.내가 이 영화를 Favorite 리스트에 넣었는지 정보를 DB 에서 가져오기
    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
        .exec((err, info) => {
            if (err) return res.status(400).send(err);

            let result = false;
            if (info.length !== 0) {
                result = true;
            }
            res.status(200).json({ success: true, favorited: result });
        });



});


//좋아요 추가
router.post("/addToFavorite", (req, res) => {
    const favorite = new Favorite(req.body);

    favorite.save((err, doc) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true })
    })
});



//좋아요 삭제
router.post("/removeFromFavorite", (req, res) => {

    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, doc });
        })

});





module.exports = router;