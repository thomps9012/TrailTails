var db = require("../models");

module.exports = function (app) {

    app.get("/singleTrail/:id", function (req, res){
        res.send(req.params.id)
    })

    // Getting three most recent saved trails for user

    app.get("/savedTrails", function (req, res){
        db.SavedTrail.findAll({where: {UserId: req.user.id}, limit: 3, order: [['updatedAt', 'DESC']]})
        .then(function (data) {
            res.json(data)
        })

    })

    // Getting 3 most recent reviewed trails for home page

    app.get("/savedReviews", function (req, res){
        db.Review.findAll({ where: { UserId: req.user.id }, limit: 3, order: [['updatedAt', 'DESC']]})
        .then(function(data) {
            res.json(data)
        })
    })

    // Get trail info by 

    // Creating and saving review for hike

    app.post("/api/createReview", async function (req, res){

        try {

        const savedReview = await db.Review.create({
            title: req.body.title, 
            trailName: req.body.trailName,
            trailId: req.body.trailId,
            overallStars: req.body.overallStars, 
            difficultyStars: req.body.difficultyStars, 
            body: req.body.review, 
            UserId: req.user.id
            })

        const hashTagArr = req.body.hashtags.split(",")
        hashTagArr.forEach(async function (tag) {
            const savedHashTag = await db.Hashtag.findOrCreate({
                where: {
                    title: tag
                },
                defaults: {
                    title: tag
                }
            })

            await db.ReviewHashtag.create({
                HashtagId: savedHashTag[0].dataValues.id,
                ReviewId: savedReview.id
                })
            }) 

            res.send(savedReview)
        
        }

        catch (err) {
            res.status(500)
            console.log(err.message)

        }
    })

    app.post("/api/saveTrail/:id", function (req, res){

        db.SavedTrail.findOrCreate({
            where: {
            trailId: req.params.id,
            UserId: req.user.id
            },
            defaults: {
                trailId: req.params.id,
                UserId: req.user.id
            }
        })
        .then(function (savedTrail, error) {
            if (error) {
                console.log(error.message)
            }

            else {
                res.status(200)
                console.log("Saved Trail!")
            }

        })

    })



}