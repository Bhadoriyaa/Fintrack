// console.log("Register JS Loaded");

// const registerForm = document.querySelector("#registerForm");

// console.log(registerForm);

// registerForm.addEventListener("submit", (e) => {

//     e.preventDefault();

//     console.log("Form Submitted");

//     const user = {
//         name: document.querySelector("#regName").value,
//         username: document.querySelector("#regUsername").value,
//         password: document.querySelector("#regPassword").value
//     };

//     console.log(user);

//     localStorage.setItem("user", JSON.stringify(user));

//     console.log("Saved:", localStorage.getItem("user"));

//     alert("Registration Successful");

//     window.location.href = "login.html";
// });

console.log("Register JS Loaded");

const registerForm = document.querySelector("#registerForm");

console.log("Form found:", registerForm);

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log("Submit event fired");

    const user = {
        name: document.querySelector("#regName").value,
        username: document.querySelector("#regUsername").value,
        password: document.querySelector("#regPassword").value
    };

    console.log(user);

    localStorage.setItem("user", JSON.stringify(user));

    console.log("Saved User:", localStorage.getItem("user"));

    alert("Registration Successful");
});