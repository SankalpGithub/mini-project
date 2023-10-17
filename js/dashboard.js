const authToken = localStorage.getItem('auth_token');
console.log(authToken);
function new_btn(){
    window.location.href = "options.html";
}

function create_class_btn(){
    window.location.href = "create_class.html";
}

const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

// Function to populate the list in HTML
function populateList() {
    const itemList = document.getElementById("info");

    // Loop through the items array and create list items
    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        itemList.appendChild(li);
    });
}
//run program
populateList();