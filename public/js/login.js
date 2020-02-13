// Navigate to register page
var $loginBtn = $("#login");
var $email = $("#email");
var $password = $("#password");

// login is called whenever the login button is checked
var login = function(event) {
  event.preventDefault();

  console.log("login button clicked");

  var loginCredentials = {
    email: $email.val().trim(),
    password: $password.val().trim()
  };

  if (loginCredentials.email === "" || loginCredentials.password === "") {
    alert("Must provide email and password");
  } else {
    credentials(loginCredentials);
    return true;
  }
};

// Add event listener to submit button
$loginBtn.on("click", login);

// Login Post Route
function credentials(loginCredentials) {
  $.post("/api/login", loginCredentials);
}
