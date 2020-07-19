// Client-side JavaScript powering front-end interface for user to create a review on a trai.
$(document).ready(function () {

    var hashtags = []

    $("#addHashtag").click(function () {
        var hashtagVal = $("#hashtag").val().trim()
        hashtags.push(hashtagVal)
        var newTextVal = "#" + hashtagVal
        var parentDiv = $("#addedHashtags")
        var hashTagBadge = $('<span />')
        hashTagBadge.addClass("badge badge-pill badge-primary")
        hashTagBadge.text(newTextVal)
        parentDiv.append(hashTagBadge)
        $("#hashtag").val("")

    })

    var reviewForm = $("form.reviewForm")
    reviewForm.on("submit", function () {
        event.preventDefault()

        var title = $("#title").val().trim()
        var overallStars = $("#overallStars").val().trim()

        var difficultyStars = $("#difficultyStars").val().trim()
        var review = $("#body").val().trim()
        var hashtagString = hashtags.toString()
        var currentTrailName = localStorage.getItem("trailName")
        var currentTrailId = localStorage.getItem("trailId")

        var data = {
            title: title,
            trailName: currentTrailName,
            trailId: currentTrailId,
            overallStars: parseInt(overallStars),
            difficultyStars: parseInt(difficultyStars),
            review: review,
            hashtags: hashtagString
        }

        console.log(data)

        // POST route to create review and save in database tied to user.

        $.post("/api/createReview", data)
            .then(function (response) {
                console.log(response)
                var currentId = localStorage.getItem("trailId")
                window.location.href = "/singleTrail/" + currentId
            })


    });









})