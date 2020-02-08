// Navigate to register page
var $loginBtn = $("#login");
var $email = $("#email");
var $password = $("#password");

// login is called whenever the login button is checked
var login = function(event) {
    event.preventDefault();

    console.log("login button clicked");

    var credentials = {
        email: $email.val().trim(),
        password: $password.val().trim()
    };

    if (!(credentials.email && credentials.password)) {
        alert("You must supply a Username and Password");
        return;
    }

    window.location.href ="";

    // Code goes here to send request to server.
    // $.post("/api/login", credentials, function() {
    //     If they credentails were good redirect user to instruction page
    //     window.location.href = "/intruction";
    //     Else keep them at the login page
    // });
}

// Add event listener to submit button
$loginBtn.on("click", login);