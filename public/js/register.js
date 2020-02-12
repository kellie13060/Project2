// Navigate to register page
var $registerBtn = $("#register");
var $name = $("#name");
var $email = $("#email");
var $password = $("#password");

// login is called whenever the login button is checked
function register(event) {
  event.preventDefault();

  console.log("register button clicked!");

  getCredentials({
    name: $name.val().trim(),
    email: $email.val().trim(),
    password: $password.val().trim()
  });

  if (!(credentials.name && credentials.email && credentials.password)) {
    alert("You must supply a name, email and password");
    return;
  }
}
// Add event listener to submit button
$registerBtn.on("click", register);

function getCredentials(userData) {
  $.post("/api/signup", userData);
}
