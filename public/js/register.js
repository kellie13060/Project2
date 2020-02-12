// Navigate to register page
var $registerBtn = $("#register");
var $name = $("#name");
var $email = $("#email");
var $password = $("#password");

// login is called whenever the login button is checked
function register(event) {
  event.preventDefault();

  userCredentials = {
    username: $name.val().trim(),
    email: $email.val().trim(),
    password: $password.val().trim()
  };

  console.log("register button clicked!", userCredentials);

  if (
    userCredentials.username === "" ||
    userCredentials.email === "" ||
    userCredentials.password === ""
  ) {
    alert("Must provide name, email, and password");
  } else {
    credentials(userCredentials);
    return true;
  }
} // Add event listener to submit button
$registerBtn.on("click", register);

function credentials(userCredentials) {
  $.post("/api/signup", userCredentials);
}
