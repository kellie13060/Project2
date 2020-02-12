// Navigate to register page
var $registerBtn = $("#register");
var $name = $("#name");
var $email = $("#email");
var $password = $("#password");

// login is called whenever the login button is checked
function register(event) {
  event.preventDefault();


  credentials = {
    username: $name.val().trim(),
    email: $email.val().trim(),
    password: $password.val().trim()
  };

  console.log("register button clicked!", credentials);

  if (
    credentials.username === "" ||
    credentials.email === "" ||
    credentials.password === ""
  ) {
    alert("Must provide name, email, and password");
  } else {
    return true;
  }
} // Add event listener to submit button
$registerBtn.on("click", register);

// function credentials(userData) {
//   $.post("/api/signup", userData);
// }
