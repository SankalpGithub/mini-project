var query = new URLSearchParams(window.location.search);
var classId = parseInt(query.get("classId"));
getJoindedStudents(classId);

absentStudents = [];
presentStudents = [];
async function getJoindedStudents(classId) {
  let post = {
    classId: classId,
  };
  console.log(post);
  await fetch("https://takemyattendence-27rl.onrender.com/getAllStudents", {
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
      console.log(typeof data);
      displayData(data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

const displayData = (joindedStudents) => {
  joindedStudents.map((ele) => {
    console.log(ele);
    const card = `<tr>
      <td>${ele.rollno}</td>
      <td>${ele.name}</td>
      <td>
          <div id="present" onclick="markPresent('${ele.name}', '${ele.email}', '${ele.rollno}', ${ele.userId})">
              <h3>P</h3>
          </div>
      </td>
      <td>
          <div id="absent" onclick="markAbsent('${ele.name}', '${ele.email}', '${ele.rollno}', ${ele.userId})">
              <h3>A</h3>
          </div>
      </td> `;
    document.getElementById("info").innerHTML += card;
  });
};

//onclick absent 
const markAbsent = (name, email, rollno, userId) => {
  let Adata = {
    name,
    email,
    rollno,
    userId,
  };
  if (absentStudents.some((obj) => obj.userId === userId)) {
    alert("value is allrady absent mark");
  } else if (presentStudents.some((obj) => obj.userId == userId)) {
// Use the filter() method to create a new array without the specified object
presentStudents = presentStudents.filter(obj => obj.userId !== userId);
absentStudents.push(Adata);
  } else {
    console.log("value get added");
    absentStudents.push(Adata);
  }
  console.log(absentStudents);
  console.log("after deleting present students", presentStudents);
};

//onclick present
const markPresent = (name, email, rollno, userId) => {

  let Pdata = {
    name,
    email,
    rollno,
    userId,
  };

  if (presentStudents.some((obj) => obj.userId === userId)) {
    alert("value is allrady absent mark");
  } else if (absentStudents.some((obj) => obj.userId == userId)) {
// Use the filter() method to create a new array without the specified object
presentStudents = absentStudents.filter(obj => obj.userId !== userId);
presentStudents.push(Pdata);
  } else {
    console.log("value get added");
    presentStudents.push(Pdata);
  }
  console.log(presentStudents);
  console.log("after deleting present students", absentStudents);
};

async function postAttendance(lectureStatus) {
  let post = {
    classId,
    presentStudents,
    absentStudents,
    lectureStatus,
  };
  console.log(post)
  console.log(post);
  await fetch("https://takemyattendence-27rl.onrender.com/createLecture", {
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
      lectures()
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function lectures(){
  var url = `dashboard_C.html`;
  window.location.href = url;
}
