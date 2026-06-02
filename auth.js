// ===================================
// DEFAULT ADMIN ACCOUNT
// ===================================

const adminUser = {
    username: "admin",
    password: "admin123"
};

// ===================================
// LOGIN
// ===================================

document
.getElementById("loginForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    const errorMessage =
        document.getElementById("errorMessage");

    if(
        username === adminUser.username &&
        password === adminUser.password
    ){

        localStorage.setItem(
            "isLoggedIn",
            "true"
        );

        localStorage.setItem(
            "adminName",
            username
        );

        window.location.href =
            "dashboard.html";

    }
    else{

        errorMessage.textContent =
            "Invalid username or password";

    }

});