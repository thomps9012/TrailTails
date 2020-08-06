// Client-side JavaScript powering user signup for the application.

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


  braintree.client.create({
    authorization: 'sandbox_g42y39zw_348pk9cgf3bgyw2b'
  }, function(err, clientInstance) {
    if (err) {
      console.error(err);
      return;
    }
  
    braintree.hostedFields.create({
      client: clientInstance,
      styles: {
        'input': {
          'font-size': '16px',
          'font-family': 'roboto, verdana, sans-serif',
          'font-weight': 'lighter',
          'color': 'black'
        },
        ':focus': {
          'color': 'black'
        },
        '.valid': {
          'color': 'black'
        },
        '.invalid': {
          'color': 'black'
        }
      },
      fields: {
        number: {
          selector: '#card-number',
          placeholder: '1111 1111 1111 1111'
        },
        cvv: {
          selector: '#cvv',
          placeholder: '111'
        },
        expirationDate: {
          selector: '#expiration-date',
          placeholder: 'MM/YY'
        },
        postalCode: {
          selector: '#postal-code',
          placeholder: '11111'
        }
      }
    }, function(err, hostedFieldsInstance) {
      if (err) {
        console.error(err);
        return;
      }
      
      function findLabel(field) {
        return $('.hosted-field--label[for="' + field.container.id + '"]');
      }
  
      hostedFieldsInstance.on('focus', function (event) {
        var field = event.fields[event.emittedBy];
        
        findLabel(field).addClass('label-float').removeClass('filled');
      });
      
      // Emulates floating label pattern
      hostedFieldsInstance.on('blur', function (event) {
        var field = event.fields[event.emittedBy];
        var label = findLabel(field);
        
        if (field.isEmpty) {
          label.removeClass('label-float');
        } else if (field.isValid) {
          label.addClass('filled');
        } else {
          label.addClass('invalid');
        }
      });
      
      hostedFieldsInstance.on('empty', function (event) {
        var field = event.fields[event.emittedBy];
  
        findLabel(field).removeClass('filled').removeClass('invalid');
      });
      
      hostedFieldsInstance.on('validityChange', function (event) {
        var field = event.fields[event.emittedBy];
        var label = findLabel(field);
  
        if (field.isPotentiallyValid) {
          label.removeClass('invalid');
        } else {
          label.addClass('invalid');  
        }
      });
  
      $('#cardForm').submit(function (event) {
        event.preventDefault();
  
        hostedFieldsInstance.tokenize(function (err, payload) {
          if (err) {
            console.error(err);
            return;
          }
  
          // This is where you would submit payload.nonce to your server
          alert('Submit your nonce to your server here!');
        });
      });
    });
  });