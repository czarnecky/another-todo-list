console.log("hello");

//Global variables
let todoInput;
let errorInfo;
let addBtn;
let ulList;
let newTodo;

let popup;
let popupInfo;
let todoToEdit;
let popupInput;
let popupAddBtn;
let popupCloseBtn;

//Main functions
const main = () => {
  prepareDOMElements();
  prepareDOMEvents();

  checkStatus();
};

const prepareDOMElements = () => {
  todoInput = document.querySelector(".todo-input");

  errorInfo = document.querySelector(".error-info");

  addBtn = document.querySelector(".btn-add");

  ulList = document.querySelector(".todolist ul");

  welcomeText = document.querySelector(".welcome-text");

  popup = document.querySelector(".popup");
  popupInfo = document.querySelector(".popup-info");
  popupInput = document.querySelector(".popup-input");
  popupAddBtn = document.querySelector(".accept");
  popupCloseBtn = document.querySelector(".cancel");
};

const prepareDOMEvents = () => {
  //tutaj nadajemy nasłuchiwanie
  addBtn.addEventListener("click", addNewTodo);
  todoInput.addEventListener("keyup", enterChcek);
  ulList.addEventListener("click", checkClick);
  popupCloseBtn.addEventListener("click", closePopup);
  popupAddBtn.addEventListener("click", changeTodoText);
};

const checkStatus = () => {
  if (ulList.firstChild) {
    console.log("ma dzieci");
    welcomeText.innerHTML = "";
  } else {
    console.log("nie ma");
    html = "<div class='no-tasks'>No tasks. C'mon add smth! 🤙</div>";
    welcomeText.innerHTML = html;
  }
};

const addNewTodo = () => {
  if (todoInput.value !== "") {
    newTodo = document.createElement("li");
    newTodo.classList.add("tasks__item");
    newTodo.textContent = todoInput.value;
    createToolsArea();

    ulList.append(newTodo);

    todoInput.value = "";
    errorInfo.textContent = "";
    errorInfo.classList.add("d-none");
  } else {
    errorInfo.classList.remove("d-none");
    errorInfo.textContent = "Enter your task content first, please!";
  }

  checkStatus();
};

const createToolsArea = () => {
  const toolsPanel = document.createElement("div");
  toolsPanel.classList.add("tools");
  newTodo.append(toolsPanel);

  const completeBtn = document.createElement("button");
  completeBtn.classList.add("complete", "btn", "btn-check");
  completeBtn.innerHTML = '<span class="btn-check__icon"></span>';

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit", "btn", "btn-edit");
  editBtn.innerHTML = '<span class="btn-edit__icon"></span>';

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete", "btn", "btn-remove");
  deleteBtn.innerHTML = '<span class="btn-remove__icon"></span>';

  toolsPanel.append(completeBtn, editBtn, deleteBtn);
};

const checkClick = (e) => {
  if (e.target.matches(".complete")) {
    e.target.closest("li").classList.toggle("completed");
    e.target.classList.toggle("completed");
  } else if (e.target.matches(".edit")) {
    editTodo(e);
  } else if (e.target.matches(".delete")) {
    removeTodo(e);
  }
};

const editTodo = (e) => {
  todoToEdit = e.target.closest("li");
  popupInput.value = todoToEdit.firstChild.textContent.trim();

  popup.style.display = "flex";
};

const changeTodoText = () => {
  if (popupInput.value !== "") {
    todoToEdit.firstChild.textContent = popupInput.value;
    popup.style.display = "none";
    popupInfo.textContent = "";
    popupInfo.classList.add("d-none");
  } else {
    // popupInfo.textContent = "Podaj tresc zadania";
    popupInfo.classList.remove("d-none");
    popupInfo.textContent = "Ups! Enter task content, please.";
  }
};

const removeTodo = (e) => {
  e.target.closest("li").remove();

  const allTodos = ulList.querySelectorAll("li");

  if (allTodos.length === 0) {
    errorInfo.textContent = "No TODO tasks!";
  }

  checkStatus();
};

const closePopup = () => {
  popup.style.display = "none";
  popupInfo.textContent = "";
};

const enterChcek = (e) => {
  if (e.key === "Enter") {
    addNewTodo();
  }
};

//dopiero kiedy cała strona sie załaduje (DOM) to uruchom funckje
document.addEventListener("DOMContentLoaded", main);

console.log("---");
