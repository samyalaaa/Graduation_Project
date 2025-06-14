// Declaring variables with proper keywords
const email = document.querySelector("#email");
const password = document.querySelector("#password");

// Array to store users
const allUsers = JSON.parse(localStorage.getItem("Users")) || [];

// Login the user
function login() {
  // Validate inputs before processing
  if (!email.value || email.value === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Email is required",
    });
    return;
  }
  
  if (!password.value || password.value === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Password is required",
    });
    return;
  }

  const userCredentials = {
    User_email: email.value,
    User_Password: password.value,
  };

  // Check if user exists
  const foundUser = allUsers.find(
    user => 
      user.User_email === userCredentials.User_email && 
      user.User_Password === userCredentials.User_Password
  );

  if (foundUser) {
    // Store active user in localStorage
    localStorage.setItem("Active User", JSON.stringify({
      User_email: foundUser.User_email,
      User_Password: foundUser.User_Password
    }));
    
    // Clear form and redirect
    clearUsers();
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Login successful",
      timer: 2000,
      showConfirmButton: false
    }).then(() => {
      location.href = "../shop/shop.html";
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Invalid Email or Password",
    });
  }
}

// Clear the input fields
function clearUsers() {
  email.value = "";
  password.value = "";
}

// don't have an account
function Register() {
  window.location.href = "../register/register.html";
}