// Navigate to register page
var $registerBtn = $("#register");
var $name = $("#name");
var $email = $("#email");
var $password = $("#password");

// login is called whenever the login button is checked
function register(event) {
  event.preventDefault();

  console.log("register button clicked!");

  credentials({
    name: $name.val().trim(),
    email: $email.val().trim(),
    password: $password.val().trim()
  });

  if (credentials.name.val === "") {
    alert("Must provide a name");
  } else {
    return true;
  }
} // Add event listener to submit button
$registerBtn.on("click", register);

function credentials(userData) {
  $.post("/api/signup", userData);
}
