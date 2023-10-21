const authToken = localStorage.getItem("auth_token");
var query = new URLSearchParams(window.location.search);
var classId = parseInt(query.get("classId"));
var className = query.get("className");

const showClassData = (classId, className) => {
  const profileHeader = `<h3 id="className">${className}</h3>
  <h3 id="myclassId">${classId}</h3>`;
  document.getElementById("profile").innerHTML = profileHeader;
};

async function lectures() {
  let post = {
    classId: classId,
  };
  console.log(post);
  await fetch("https://takemyattendence-27rl.onrender.com/getAllLectures", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayData(sortfun(data));
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function sortfun(lecture){
  var uplodedlec = [];
  lecture.map((ele) => {
    if(ele.lectureStatus == 11){
      uplodedlec.push(ele)
    }
  });
  console.log(uplodedlec);
  return uplodedlec;
} 

const displayData = (lectureArray) => {
  console.log(lectureArray);
  lectureArray.map((ele) => {
    const card = ` <li id="ud_further" onclick="exportPage(${ele._id}, '${ele.date}', '${className}')">
        <div id="date">
            <h5>${ele.date}</h5>
        </div>
        <div id="time">
            <h5>${ele.time}</h5>
        </div>
        <div id="day">
            <h5>${ele.day}</h5>
        </div>
      </li>`;
    document.getElementById("info").innerHTML += card;
  });
};

function exportPage(lectureId, classDate, className){
  window.location.href = `export.html?Id=${lectureId}&className=${className}&date=${classDate}`;
}

const setupPage = () => {
  lectures();
  document.addEventListener("DOMContentLoaded", function () {
    // Your code to set innerHTML goes here
    showClassData(classId, className);
  });
};

setupPage();
