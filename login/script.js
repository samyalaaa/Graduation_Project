let loginUserEmail = document.getElementById("email");
let loginUserPass = document.getElementById("password");
let loginBtn = document.querySelector(".login-btn");

loginBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  if (!loginUserEmail.value || !loginUserPass.value) return;

  const userData = {
    email: loginUserEmail.value,
    password: loginUserPass.value,
  };
  
  try {
    const res = await fetch("https://visionhub.runasp.net/api/Account/Login", {
      body: JSON.stringify(userData),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    if (data.token) {
      localStorage.setItem("token", data.token);
      const displayName = (data.userName || userData.email).substring(0, 5);
      localStorage.setItem("userName", displayName);
      localStorage.setItem("userId", data.userId);

      Swal.fire({
        icon: "success",
        title: "Login Successfull!",
        timer: 1500,
        showConfirmButton: true,
      }).then(() => {
        window.location.href = "../shop/shop.html";
      });
    } else {
      throw new Error("Login failed");
    }
  } catch (e) {
    console.log(e);
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Please check your email or password",
    });
  }
});