$(document).ready(function() {
    // Getting references to our form and input
    var signUpForm = $("form.signup");
    var firstNameInput = $("input#firstName-input");
    var lastNameInput = $("input#lastName-input");
    var homeTownInput = $("input#pac-input")
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");
    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", function(event) {
      event.preventDefault();
      var homeTownText = homeTownInput.val().trim()
      var homeTownArr = homeTownText.split(",")
      var userData = {
        firstName: firstNameInput.val().trim(),
        lastName: lastNameInput.val().trim(), 
        homeCity: homeTownArr[0],
        homeState: homeTownArr[1],
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };
      if (!userData.firstName || !userData.lastName || !userData.email || !userData.password || !userData.homeCity || !userData.homeState) {
        return;
      }
      // If we have an email and password, run the signUpUser function
      signUpUser(userData.firstName, userData.lastName, userData.homeCity, userData.homeState, userData.email, userData.password);
      firstNameInput.val("");
      lastNameInput.val("");
      homeTownInput.val("");
      emailInput.val("");
      passwordInput.val("");
    });
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(firstName, lastName, homeCity, homeState, email, password) {
      $.post("/api/signup", {
        firstName: firstName,
        lastName: lastName,
        homeCity: homeCity,
        homeState: homeState,
        email: email,
        password: password
      })
        .then(function(data) {
          window.location.replace("/members");
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
    }
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
  });