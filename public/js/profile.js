// Client side JavaScript powering front-end for our profile page.

$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(userData) {
      var userInfoParentDiv = $("#userInfoDiv")

      var fullNameEl = $("<h1>")
      fullNameEl.text(userData.firstName + " " + userData.lastName)

      var homeTownEl = $("<p>")
      homeTownEl.text(userData.homeCity + "," + userData.homeState)

      userInfoParentDiv.append(fullNameEl, homeTownEl)
    });

    // API call to our database which retrieves the user's saved trails and displays them on the page.

  $.get("/savedTrails").then(function (savedTrails) {
    savedTrails.forEach(trail => {

      var hikeURL = "https://www.hikingproject.com/data/get-trails-by-id?ids=" + trail.trailId + "&key=200712211-0e0047c0b205b2d2705a464dd36eccec"
      $.ajax({
        url: hikeURL,
        method: "GET",
        dataType: "JSON"
      }).then(function (response) {
        var name = response.trails[0].name
        // console.log(response.trails[0])
        var aEl = $("<a>")
        aEl.addClass("list-group-item list-group-item-action savedTrail")
        aEl.css("cursor", "pointer")
        aEl.attr("href", "/singleTrail/" + response.trails[0].id)
        aEl.text(name)
        $("#savedTrailParentDiv").append(aEl)
      })
    })
  })

  // API call to our database which retreives user's saved reviews and displays them on page.

  $.get("/savedReviews").then(function (reviews) {
    reviews.forEach(review => {
      console.log(review.trailId)
      var parentDiv = $("#reviewedTrailParentDiv")
      var aEl = $("<a>")
      aEl.addClass("list-group-item list-group-item-action savedReview")
      aEl.css("cursor", "pointer")
      aEl.text(review.trailName)
      aEl.attr("href", "/singleTrail/" + review.trailId)
      var spanEl = $("<span>")
      spanEl.addClass("fa fa-star")
      spanEl.css("float", "right")
      spanEl.css("padding-top", "2.7px")
      var starText = review.overallStars.toString()
      spanEl.text(starText)
      aEl.append(spanEl)
      parentDiv.append(aEl)
    })

  })
});
  