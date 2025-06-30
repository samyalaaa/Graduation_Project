let email = document.getElementById("email");
let password = document.getElementById("Password");
let user = document.getElementById("userName");
let signupBtn = document.querySelector(".register-btn");

signupBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  if (!email.value || !password.value  || !user.value ) return;
  const userData = {
    userName: user.value,
    phoneNumber: "01000000000",
    age: "22",
    email: email.value,
    password: password.value,
    type: 0,
    role: "user"
  };
  console.log(JSON.stringify(userData, null, 2));

  try {
    const res = await fetch(
      "https://visionhub.runasp.net/api/Account/Register",
      {
        body: JSON.stringify(userData),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      if (data.errors && data.errors[0]) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.errors[0],
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong",
        });
      }
      return;
    }
    Swal.fire({
      title: "Register Successfull!",
      icon: "success",
      draggable: true,
    }).then(() => {
      window.location.href = "../login/login.html";
    });
  } catch (error) {
    // console.error(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Network error",
    });
  }
});