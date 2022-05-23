"user strict";

const openModal = () => {
  document.getElementById("modal").classList.add("active");
  document.getElementById("description").focus();
};

const closeModal = () => {
  clearFields();
  document.getElementById("modal").classList.remove("active");
};
// ------------ CRUD (create) --------------

const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_posts")) ?? [];

const setLocalStorage = (dbPosts) =>
  localStorage.setItem("db_posts", JSON.stringify(dbPosts));

const getUserLogged = () => JSON.parse(localStorage.getItem("loggedUser"));

const createPosts = (posts) => {
  const dbPosts = getLocalStorage();
  dbPosts.push(posts);
  setLocalStorage(dbPosts);
};

// ------------ CRUD (read) --------------

const readPosts = () =>
  localStorage.getItem("db_posts")
    ? JSON.parse(localStorage.getItem("db_posts")).filter(
        (post) => post.userName === getUserLogged().userName
      )
    : [];

// ------------ CRUD (update) --------------

const updatePosts = (index, posts) => {
  const dbPosts = readPosts();
  dbPosts[index] = posts;
  setLocalStorage(dbPosts);
};

// ------------ CRUD (delete) --------------

const deletePosts = (index) => {
  const dbPosts = readPosts();
  dbPosts.splice(index, 1);
  setLocalStorage(dbPosts);
};

// --------- Layout interaction ------------------------

const clearTable = () => {
  const rows = document.querySelectorAll("#post-records>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

let i = 1;

const createRow = (post, index) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
        <td>${i}</td>
        <td>${post.description}</td>
        <td>${post.details}</td>
        <td>
            <input class="btn-green" type="button" value="Edit" id="edit-${index}">
            <input class="btn-red" type="button" value="Delete" id="delete-${index}">
        </td>
    `;
  document.querySelector("#post-records>tbody").appendChild(newRow);
  i++;
};

const updateTable = () => {
  const dbPosts = readPosts();
  clearTable();
  dbPosts.forEach(createRow);
  i = 1;
};

updateTable();

const clearFields = () => {
  const fields = document.querySelectorAll(".modal-field");  
  fields.forEach((field) => (field.value = ""));
  document.getElementById("description").focus();
};

const isValidFields = () => {
  return document.getElementById("posts-form").reportValidity();
};

const reloadPage = () => {
  location.reload();
};

const savePost = () => {
  if (isValidFields()) {

    const posts = {
      description: document.getElementById("description").value,
      details: document.getElementById("details").value,
      userName: getUserLogged().userName,
    };
    const index = document.getElementById("description").dataset.index;
    if (index == "new") {
      createPosts(posts);
      updateTable();
      closeModal();
      reloadPage();
    } else {
      updatePosts(index, posts);
      updateTable();
      closeModal();
      reloadPage();
    }
  }
};

const fillFields = (post) => {
  document.getElementById("description").value = post.description;
  document.getElementById("details").value = post.details;
  document.getElementById("description").dataset.index = post.index;
};

const editPost = (index) => {
  const post = readPosts()[index];
  post.index = index;
  fillFields(post);
  openModal();
};

const editDelete = (event) => {
  if (event.target.type == "button") {
    const [action, index] = event.target.id.split("-");
    if (action == "edit") {
      editPost(index);
    } else {
      const post = readPosts()[index];
      const response = confirm(`Do you really want to delete this note?`);
      if (response) {
        deletePosts(index);
        updateTable();
      }
    }
  }
};

// --------- Events -------------
document.getElementById("post-message").addEventListener("click", openModal);

document.getElementById("modal-close").addEventListener("click", closeModal);

document.getElementById("savePost").addEventListener("click", savePost);

document.querySelector("#post-records").addEventListener("click", editDelete);

document.querySelector("#cancelPost").addEventListener("click", clearFields);
