// Declaring variables with proper declarations
const userName = document.querySelector("#userName");
const email = document.querySelector("#email"); // Fixed typo from "emial" to "email"
const password = document.querySelector("#Password");
const confirmPassword = document.querySelector("#Confirm");

// Array to store all users
let allUsers = [];

// Load existing users from localStorage if available
if (localStorage.getItem("Users")) {
  allUsers = JSON.parse(localStorage.getItem("Users"));
}

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Check if email already exists
function isEmailTaken(emailToCheck) {
  return allUsers.some(user => user.User_email === emailToCheck);
}

// Registering the user
function Register() {
  // Create user object
  const obj = {
    User_name: userName.value,
    User_email: email.value,
    User_Password: password.value,
    User_Confirm: confirmPassword.value
  };

  // Validation checks
  if (userName.value === "" && email.value === "" && password.value === "" && confirmPassword.value === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill in all fields",
    });
  } else if (userName.value === "" || userName.value == null) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "User Name is required",
    });
  } else if (email.value === "" || email.value == null) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Email is required",
    });
  } else if (!isValidEmail(email.value)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter a valid email address",
    });
  } else if (isEmailTaken(email.value)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "This email is already registered",
    });
  } else if (password.value === "" || password.value == null) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Password is required",
    });
  } else if (password.value.length < 8) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Password must be at least 8 characters",
    });
  } else if (password.value !== confirmPassword.value) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Password does not match",
    });
  } else {
    // All validations passed, register the user
    allUsers.push(obj);
    localStorage.setItem("Users", JSON.stringify(allUsers));
    clearUsers();
    
    // Show success message before redirecting
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Registration successful. Redirecting to login...",
      timer: 2000,
      showConfirmButton: false
    }).then(() => {
      location.href = "../login/login.html";
    });
  }
}

// Clearing the fields after successful registration
function clearUsers() {
  userName.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
}

