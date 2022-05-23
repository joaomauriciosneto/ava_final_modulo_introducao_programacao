let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

let logged = document.getElementById("logged");
logged.innerHTML = `User <em>${loggedUser.userName.fontcolor(
  "#01AEAA"
)}</em> is logged!`;

if (localStorage.getItem("token") == null) {
  alert("You need to be logged in to access the system!");
  location.href = "index.html";
}

function exit() {
  localStorage.removeItem("token");
  alert('Always come back!')
  location.href = "index.html";
}

//------------------------------------------------
