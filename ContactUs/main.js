document.addEventListener("DOMContentLoaded", function () {
  // ========== Register ==========
  let email = document.getElementById("email");
  let password = document.getElementById("Password");
  let user = document.getElementById("userName");
  let signupBtn = document.querySelector(".register-btn");

  if (signupBtn) {
    signupBtn.addEventListener("click", async function (e) {
      e.preventDefault();
      if (!email.value || !password.value || !user.value) {
        Swal.fire({
          icon: "warning",
          title: "Missing Fields",
          text: "Please fill in all fields!",
        });
        return;
      }

      const userData = {
        userName: user.value,
        phoneNumber: "01000000000",
        age: "22",
        email: email.value,
        password: password.value,
        type: 0,
        role: "user",
      };

      try {
        const res = await fetch("https://visionhub.runasp.net/api/Account/Register", {
          body: JSON.stringify(userData),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const resText = await res.text();
        let data = {};
        try {
          data = JSON.parse(resText);
        } catch (err) {
          console.warn("Response is not valid JSON");
        }

        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("userName", data.userName || userData.userName);
          localStorage.setItem("email", data.email || userData.email);

          Swal.fire({
            icon: "success",
            title: "Sign Up Successful!",
            timer: 1500,
            showConfirmButton: true,
          }).then(() => {
            window.location.href = "../login/login.html";
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Signup Failed",
            text: data.message || "Something went wrong",
          });
        }
      } catch (e) {
        console.error(e);
        Swal.fire({
          icon: "error",
          title: "Signup Failed",
          text: "Network error. Please try again.",
        });
      }
    });
  }

  // ========== Login ==========
  let loginUserEmail = document.getElementById("email");
  let loginUserPass = document.getElementById("password");
  let loginBtn = document.querySelector(".login-btn");

  if (loginBtn) {
    loginBtn.addEventListener("click", async function (e) {
      e.preventDefault();
      if (!loginUserEmail.value || !loginUserPass.value) {
        Swal.fire({
          icon: "warning",
          title: "Missing Credentials",
          text: "Please enter your email and password.",
        });
        return;
      }

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
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("userName", data.userName || userData.email);
          localStorage.setItem("email", data.email || userData.email);

          Swal.fire({
            icon: "success",
            title: "Login Successful!",
            timer: 1500,
            showConfirmButton: true,
          }).then(() => {
            window.location.href = "../home.html";
          });
        } else {
          throw new Error("Login failed");
        }
      } catch (e) {
        console.log(e);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Please check your email and password.",
        });
      }
    });
  }

  // ========== Contact Us ==========
  const submit = document.querySelector("#submit-button");
  const fullName = document.querySelector("#name");
  const emaill = document.querySelector("#email");
  const message = document.querySelector("#message");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (submit && fullName && emaill && message) {
    submit.addEventListener("click", async function (e) {
      e.preventDefault();

      // فحص الدخول
      if (!token || !userId) {
        Swal.fire({
          icon: "error",
          title: "Not Logged In",
          text: "Please log in before sending a message.",
        });
        return;
      }

      // فحص الحقول
      if (!fullName.value.trim() || !emaill.value.trim() || !message.value.trim()) {
        Swal.fire({
          icon: "warning",
          title: "Missing Information",
          text: "Please fill in all the fields before sending.",
        });
        return;
      }

      const data = {
        receiverId: userId.value,
        message: message.value,
      };

      try {
        const res = await fetch("https://visionhub.runasp.net/api/Chat/send", {
          body: JSON.stringify(data),
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const result = await res.json();

        Swal.fire({
          icon: "success",
          title: "Sent successfully",
          text: "Thank you for contacting us 💌",
          confirmButtonText: "Ok",
        }).then(() => {
          window.location.href = "../shop/shop.html";
        });
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Message Failed",
          text: "Please try again later.",
        });
      }
    });
  }
});
