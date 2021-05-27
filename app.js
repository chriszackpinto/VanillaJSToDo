const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);

function addTodo(e) {
  e.preventDefault();

  const todos =
    localStorage.getItem("todos") === null
      ? []
      : JSON.parse(localStorage.getItem("todos"));

  if (todoInput.value.length === 0) {
    todoInput.style.animation = "shake 0.5s linear";
    todoInput.addEventListener("animationend", () => {
      todoInput.style.animation = "";
    });
    return;
  } else {
    todos.push(todoInput.value); //Savelocal
    localStorage.setItem("todos", JSON.stringify(todos));

    todoHtml(todoInput.value);

    todoInput.value = "";
  }
}

function deleteCheck(e) {
  const item = e.target;

  const todo = e.target.closest(".todo");
  if (item.classList[0] === "trash-btn") {
    todo.classList.add("fall");

    const todos =
      localStorage.getItem("todos") === null
        ? []
        : JSON.parse(localStorage.getItem("todos"));
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1); //Delete local
    localStorage.setItem("todos", JSON.stringify(todos));

    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  } else if (item.classList[0] === "complete-btn") {
    todo.classList.toggle("completed");
    filterTodo();
  }
}

function filterTodo(e) {
  todoList.childNodes.forEach(function (todo) {
    switch (filterOption.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function getTodos() {
  const todos =
    localStorage.getItem("todos") === null
      ? []
      : JSON.parse(localStorage.getItem("todos"));
  todos.forEach((todo) => todoHtml(todo));
}

function todoHtml(todo) {
  const html = `<div class="todo">
    <li class='todo-item'>${todo}</li><button class="complete-btn"><i class="fas fa-check"></i></button><button class="trash-btn"><i class="fas fa-trash"></i></button></div>`;
  todoList.insertAdjacentHTML(`beforeend`, html);
}
