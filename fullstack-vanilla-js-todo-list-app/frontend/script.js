const todoContainer = document.querySelector(".todo-container");
const inputTodo = document.getElementById("input-todo");
const addTodo = document.getElementById("add-todo");

const modalBG = document.querySelector(".modal-background");
const closeModal = document.querySelector("#close-modal");
const editTodoName = document.getElementById("edit-todo-name");
const editTodoCompleted = document.getElementById("edit-todo-completed");
const saveTodo = document.getElementById("save-todo");

let todoArray = [];

const URL = "http://localhost:3000/todos";

async function get_Todos() {
  try {
    const resp = await fetch(URL);
    const data = await resp.json();
    return data;
  } catch (error) {
    return error;
  }
}

async function post_todos() {
  try {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        title: inputTodo.value, 
        completed: false 
      }),
    };
    const resp = await fetch(URL, options);
    const data = await resp.json();
    return data;
  } catch (error) {
    return error;
  }
}

async function edit_todos() {
  try {
    let edit_url = URL + "/" + todoElem.id;
    let options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: todoElem.id,
        title: editTodoName.value,
        completed: editTodoCompleted.checked,
      }),
    };
    const resp = await fetch(edit_url, options);
    const data = await resp.json();
    return data;
  } catch (error) {
    return error;
  }
}

function open_modal(todoElem) {
  editTodoName.value = todoElem.title;
  editTodoCompleted.checked = todoElem.completed;
  modalBG.style.display = "block";
  closeModal.addEventListener("click", () => {
    modalBG.style.display = "none";
  });
  saveTodo.addEventListener("click", () => {
    modalBG.style.display = "none";
    edit_todos(todoElem);
  })
}

async function del_Todo(todoElem) {
  try {
    const del_url = URL + "/" + todoElem.id;
    const options = {
      method: "DELETE",
    };
    const resp = await fetch(del_url, options);
    const data = await resp.json();
    return data;
  } catch (error) {
    return error;
  }
}

function display_Todos(todoArr) {
  todoArr.forEach((todoElem) => {
    console.log(todoElem);

    //Parent
    let todo = document.createElement("div");
    todo.classList.add("todo");

    //Children
    let todoInfo = document.createElement("div");
    todoInfo.classList.add("todo-info");
    let todoBtn = document.createElement("form");
    todoBtn.classList.add("todo-btn");

    //Grandchildren
    let todoCompleted = document.createElement("input");
    todoCompleted.classList.add("todo-completed");
    todoCompleted.setAttribute("type", "checkbox");
    todoCompleted.checked = todoElem.completed;
    let todoName = document.createElement("p");
    todoName.classList.add("todo-name");
    todoName.innerHTML = todoElem.title; // or todoElem.name

    let todoEdit = document.createElement("button");
    todoEdit.classList.add("todo-edit");
    todoEdit.innerHTML = "Edit";
    todoEdit.addEventListener("click", (e) => {
      e.preventDefault();
      open_modal(todoElem);
    });

    let todoDel = document.createElement("button");
    todoDel.classList.add("todo-delete");
    todoDel.innerHTML = "Delete";
    todoDel.addEventListener("click", () => {
      del_Todo(todoElem)
    });

    todoInfo.appendChild(todoCompleted);
    todoInfo.appendChild(todoName);
    todoBtn.appendChild(todoEdit);
    todoBtn.appendChild(todoDel);

    todo.appendChild(todoInfo);
    todo.appendChild(todoBtn);

    todoContainer.appendChild(todo);
  });
}

get_Todos()
  .then((todoArray) => {
    todoArray = todoArray;
    console.log(todoArray);
    display_Todos(todoArray);
  })
  .catch((err) => console.log(err));


addTodo.addEventListener("click", (e) => {
  if(inputTodo.value != "") {
    post_todos();
  }
});