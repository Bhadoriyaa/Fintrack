const loginForm = document.querySelector("#loginForm");
let register  = document.querySelector(".register")

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
        alert("Please register first.");
        return;
    }

    if (
        username === savedUser.username &&
        password === savedUser.password
    ) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("username", savedUser.name);

        window.location.href = "index.html";
    } else {
        alert("Invalid username or password.");
    }
});

register.addEventListener("click", () =>{
    console.log("clicked");
    
})