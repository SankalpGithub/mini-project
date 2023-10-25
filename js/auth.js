//login page
async function login(){
    console.log("button_clicked");
    const email = document.getElementById("email").value;
    const Cr_password = document.getElementById("password").value;
  
    let postData = {
      "email": email,
      "password": Cr_password,
    };
    console.log(postData);
    await fetch("https://takemyattendence-27rl.onrender.com/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if(data['status'] == true){
          console.log(data);
          localStorage.setItem('auth_token', data['authToken']);
          window.location.href = "dashboard_C.html";
        }else{
          alert(data['message']);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
      Cr_password.value = '';
  }

  // signup page
  async function signup() {
    console.log("button_clicked");
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const Cr_password = document.getElementById("Cr_password").value;
    const Co_password = document.getElementById("Co_password").value;
    // check password and confrim password

  
    let postData = {
      "name": name,
      "email": email,
      "password": Cr_password,
    };
    console.log(postData);
    await fetch("https://takemyattendence-27rl.onrender.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok"+ response);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if(data['status'] == true){
  
         window.location.href = "OTP.html?email=" + encodeURIComponent(email);
  
  
          }else{
alert(data['message']);
}
        // window.location.href = "OTP.html";
        console.log(data['status']);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }



  //check otp

  async function checkOTP() {
    var query = new URLSearchParams(window.location.search);
    var email = query.get('email');
    const OTP = parseInt(document.getElementById("otp").value);
  
    let postData = {
      "email": email,
      "user_otp": OTP,
    };
    console.log(postData);
    await fetch("https://takemyattendence-27rl.onrender.com/verifyEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if(data['status'] == true){
          localStorage.setItem('auth_token', data['authToken']);
          console.log("go to dashboard");
         window.location.href = "dashboard_C.html";
          }
          else{
            console.log("OTP incorrect");
          }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  

  //forgot password
  async function forgot_pass() {
    const email = document.getElementById("email").value;
    const new_pass =document.getElementById("new_pass").value;
    // check new pass and confrim pass
  
    let postData = {
      "email": email,
      "password": new_pass,
    };
    console.log(postData);
    await fetch("https://takemyattendence-27rl.onrender.com/resetpassword",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if(data['status'] == true){
          alert("emal for reset password is sent to "+email)
          }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }