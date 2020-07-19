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

        // This post route kicks off a serious of interactions with our database. 
        // Because we need to perform multiple CRUD operations, it's best to use async/await to ensure they happen in the correct order.

        try {

            // First operation - saving review to database and associating review with user. 

        const savedReview = await db.Review.create({
            title: req.body.title, 
            trailName: req.body.trailName,
            trailId: req.body.trailId,
            overallStars: req.body.overallStars, 
            difficultyStars: req.body.difficultyStars, 
            body: req.body.review, 
            UserId: req.user.id
            })

        // Second - save hashtags to database in hashtag table by looping through array of hashtags. 

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


         // Creating association through the ReviewHashtag join table in our database to save the relationship between hashtags and review. 
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

    // Saving trail and associating user with that saved trail.

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