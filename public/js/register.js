// Navigate to register page
var $registerBtn = $("#register");
var $name = $("#name")
var $email = $("#email");
var $password = $("#password");

// login is called whenever the login button is checked
var register = function(event) {
    event.preventDefault();

    console.log("register button clicked!");

    var credentials = {
        name: $name.val().trim(),
        email: $email.val().trim(),
        password: $password.val().trim()
    };

    if (!(credentials.name && credentials.email && credentials.password)) {
        alert("You must supply a name, email and password");
        return;
    }

    // Code goes here to send request to server.
    // $.post("/api/signup", credentials, function() {
    //     If they credentails were good redirect user to instruction page
    //     window.location.href = "/intruction";
    //     Else keep them at the login page
    // });
}

// Add event listener to submit button
$registerBtn.on("click", register);