const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");


//'좋아요' 숫자 갯수 가져오기
router.post("/favoriteNumber", (req, res) => {

    //1.mongoDD 에서 movieId 에 대한 정보를 가져오기
    Favorite.findById({ "movieId": req.body.movieId })
        .exec((err, info) => {
            if (err) return res.status(400).send(err);

            //2.좋아요를한  유저정보 길이 반환
            res.status(200).json({ success: true, favoriteNumber: info.length });
        })


})


module.exports = router;