$(document).ready(function () {

    //set lat & long by pulling from document and setting our API key with queryurl 
    //need to update lat and long to trailhead location
    var locationLat = "";
    var locationLong = "";
    var searchLat = "";
    var searchLong = "";


    $.get("/savedTrails").then(function(savedTrails){
        if (savedTrails.length > 0) {
            var headerParentDiv = $("#savedTrailsHeaderParent")
            var headerDiv = $("<div>")
            headerDiv.addClass("saved-card-header")
            headerDiv.text("Saved Trails")
            headerParentDiv.prepend(headerDiv)
            savedTrails.forEach(trail => {
            
            var hikeURL = "https://www.hikingproject.com/data/get-trails-by-id?ids=" + trail.trailId +  "&key=200712211-0e0047c0b205b2d2705a464dd36eccec"
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
        }

    })

    $.get("/savedReviews").then(function(reviews){
        if(reviews.length > 0) {
        var headerParentDiv = $("#reviewedTrailsHeaderParentDiv")
        var headerDiv = $("<div>")
        headerDiv.addClass("reviewed-card-header")
        headerDiv.text("Reviewed Trails")
        headerParentDiv.prepend(headerDiv)
        
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
    }

    })

    var hike = {
        maxDistance: 10,
        minLength: 0,
        minStars: parseInt($('.avgRating .checked').length),
        apiKey: "200712211-0e0047c0b205b2d2705a464dd36eccec"
    }

    //geolocation function
    function getLocation() {

        $.ajax({
            method: "GET",
            url: "http://ip-api.com/json",
            dataType: "JSON"
        }).then(function (response) {
            console.log(response)
            var locationLat = response.lat
            var locationLong = response.lon
            localStorage.setItem("locationLat", locationLat)
            localStorage.setItem("locationLong", locationLong)
        })
    }

    

    //Displays city in input field
    function showCity() {
        locationLat = localStorage.getItem("locationLat");
        locationLong = localStorage.getItem("locationLong");
        var cityAPIKey = "bdc52f64afd883566cab72d748eec127";
        var openWeatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + locationLat + "&lon=" + locationLong + "&appid=" + cityAPIKey;

        $.ajax({
            url: openWeatherURL,
            method: "GET",
        }).then(function (response) {
            var city = response.name;
            $(".location").val(city);
        });
    };
    
    //set lat & long by pulling from document and setting our API key with queryurl 
    function geocodeAddress() {
        var geocoder = new google.maps.Geocoder();
        var address = $('.location').val();
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status === 'OK') {
                localStorage.setItem("searchLat", results[0].geometry.location.lat());
                localStorage.setItem("searchLong", results[0].geometry.location.lng());
            };
        });
        setTimeout(function () { choices(); }, 3000);
        //you can adjust the timeout if the page isn't loading correctly
    };

    function choices() {
        hike.maxDistance = parseInt($("#radius").find("option:selected").val());
        hike.minLength = parseInt($("#minTrailLength").find("option:selected").val());
        hikingTrails();

    };

    // Hiking API
    function hikingTrails() {
        searchLat = localStorage.getItem("searchLat");
        searchLong = localStorage.getItem("searchLong");
        console.log("searchLat", searchLat);
        console.log("searchLat", searchLong);

        var hikeURL = "https://www.hikingproject.com/data/get-trails?lat=" + searchLat + "&lon=" + searchLong + "&minLength=" + hike.minLength + "&maxDistance=" + hike.maxDistance + "&minStars=" + hike.minStars + "&key=" + hike.apiKey;

        $.ajax({
            url: hikeURL,
            method: "GET",
            dataType: "JSON",
        }).then(function (response) {
            var i = 0;

            $("#trailList").empty();
            for (trail in response.trails) {
                i++;
                createTrailList(response, i);
            }
        });
    };
    $(".backup_img").on("error", function(){
        $(this).attr('src', "./assets/images/dog-2.jpg");
    });
    //creates cards with a trail infromation based off of Latitude and longitude
    function createTrailList(response, i) {
        var card = $("<div class='card'>");
        var cardBody = $("<div class='card-body'>");
        var title = $("<h3 class='card-title'>").text(response.trails[i].name);
        // var summary = $("<p class='card-text'>").text(response.trails[i].summary);
        var stars = $("<p class='card-text'>").text("Stars: " + response.trails[i].stars);
        var trailLength = $("<p class='card-text'>").text("Trail Length: " + response.trails[i].length + " miles");
        var condition = $("<p class='card-text'>").text("Trail condition: " + response.trails[i].conditionStatus);
        var hikeBtn = $("<button class='btn btn-primary stretched-link'>View Trail</button>");
        var trailId = $("<p class=" + response.trails[i].id + ">");
        //console.log(trailId)
        var src = response.trails[i].imgMedium;
        var img = $("<div class='card-img'>").css("background-image", "url('" + src + "')", 'backup_img');

        // merge and add to page
        cardBody.append(title, trailLength, stars, condition, hikeBtn, trailId);
        card.append(img, cardBody);
        $("#trailList").append(card);
        $('html, body').animate({
            scrollTop: ($('#trailList').offset().top)
        }, 500);
    }


    //star rating
    $('.avgRating .fa-star').on('click', function () {
        //remove class of checked
        $('.avgRating .fa-star').removeClass('checked');
        //add class of checked to item and previous sibling items 
        $(this).addClass('checked');
        $(this).prevAll().addClass('checked');
        //get count value from index
        hike.minStars = parseInt($(this).attr('value'));
    });

    //Geo-locate button
    $(".geo-locate").on("click", function (event) {
        event.preventDefault();
        getLocation();
        //again you can adjust the timeout if the page isn't loading correctly
        setTimeout(function () { showCity(); }, 3000);
    });

    //geocodes address based off of geolocation function
    $(".submit").on("click", function (event) {
        event.preventDefault();
        geocodeAddress();


    });

    //click function on trail card
    $(document).on("click", '.stretched-link', function (event) {
        event.preventDefault(event);
        var currentId = $(this).next().attr('class');
        // localStorage.setItem("trailId", currentId)
        setTimeout(function () {
            window.location.href = "/singleTrail/" + currentId
        }, 50)
    });
    
});