const authToken = localStorage.getItem('auth_token');
console.log(authToken);


async function create_class(){
    console.log("button clicked")
        const className = document.getElementById("className").value;
        const classPassword = document.getElementById("classPass").value;
    
        let postData = {
            "className": className,
            "classPassword": classPassword,  
        };
    console.log(postData)
        await fetch("https://takemyattendence-27rl.onrender.com/createClass",{
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "authToken": authToken,
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
          })
          .catch((error) => {
            console.error("There was a problem with the fetch operation:", error);
          });
    }