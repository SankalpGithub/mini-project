const authToken = localStorage.getItem('auth_token');
fetchdata();
let email;
let userdata;
async function fetchdata(){
// URL of the API you want to make a GET request to
  await fetch("https://takemyattendence-27rl.onrender.com/user", {
    method: 'GET',
    headers: {
        "authToken": authToken,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      email = data['email'];
        displayData(data['name'], data['createClass']);
      })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  }
  
  const displayData = (username, createClassArray) => {
    document.getElementById("username").textContent = username;
    createClassArray.map((ele)=>{
        const card = `<li onclick="lectures(${ele.classId}, '${ele.className}')">
        <div id="class-name">
            <h4>${ele.className}</h4>
            <h6>${ele.numberOfStudents}</h6>
            <i class="ri-delete-bin-line" onClick="deleteClass(${ele.classId})"></i>
        </div>
        </li>`;
        document.getElementById("info").innerHTML += card;
    })
}

const deleteClass = async(id) => {
  const url = "https://takemyattendence-27rl.onrender.com/deleteclass/" + id;
  await fetch(url, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
        alert("Class removed successfully");
        location.reload();
      })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function new_btn(){
  window.location.href = "options.html?email=" + encodeURIComponent(email);
}

function lectures(classId,className){
  var url = `created_classes.html?classId=${classId}&className=${className}`;
  console.log(url)
  window.location.href = url;
}


