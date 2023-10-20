const authToken = localStorage.getItem('auth_token');
lectures();

async function lectures(){
    var query = new URLSearchParams(window.location.search);
    var classId = parseInt(query.get('lecId'));
    let post = {
      "classId": classId
    };
    await fetch("https://takemyattendence-27rl.onrender.com/getAllLectures", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      }, body: JSON.stringify(post),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }