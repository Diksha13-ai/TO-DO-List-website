const input = document.querySelector("input");
const addButton = document.querySelector(".add_button");
const todoshtml = document.querySelector(".todos");
const deleteallbutton = document.querySelector(".delete-all");

let todosJson = JSON.parse(localStorage.getItem("todos")) || [];
let filter = "";
const filters = document.querySelectorAll(".filters button");

showtodos();

function getTodohtml(todo, index) {
    if (filter && filter !== todo.status) {
        return '';
    }
    let checked = todo.status === "completed" ? "checked" : "";
    return `
    <li class="todo">
        <label for="${index}">
            <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
            <span class="${checked}">${todo.name}</span>
        </label>
        <button class="delete-btn" data-index="${index}" onclick="remove(this)">
         
            <i>&times;</i>
        </button>
    </li>
    `;
}

function showtodos() {
    if (todosJson.length === 0) {
        todoshtml.innerHTML = '';
    } else {
        todoshtml.innerHTML = todosJson.map(getTodohtml).join('');
    }
}

function addTodo(todo) {
    input.value = "";
    todosJson.unshift({ name: todo, status: "pending" });
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showtodos();
}

input.addEventListener("keyup", e => {
    let todo = input.value.trim();
    if (!todo || e.key !== "Enter") {
        return;
    }
    addTodo(todo);
});

addButton.addEventListener("click", () => {
    let todo = input.value.trim();
    if (!todo) {
        return;
    }
    addTodo(todo);
});

function updateStatus(todo) {
    let todoName = todo.parentElement.lastElementChild;
    if (todo.checked) {
        todoName.classList.add("checked");
        todosJson[todo.id].status = "completed";
    } else {
        todoName.classList.remove("checked");
        todosJson[todo.id].status = "pending";
    }
    localStorage.setItem("todos", JSON.stringify(todosJson));
}

function remove(todo) {
    const index = todo.dataset.index;
    todosJson.splice(index, 1);
    showtodos();
    localStorage.setItem("todos", JSON.stringify(todosJson));
}

filters.forEach(function (el) {
    el.addEventListener("click", (e) => {
        if (el.classList.contains('active')) {
            el.classList.remove('active');
            filter = '';
        } else {
            filters.forEach(tag => tag.classList.remove('active'));
            el.classList.add('active');
            filter = e.target.dataset.filter;
        }
        showtodos();
    });
});

deleteallbutton.addEventListener("click", () => {
    todosJson = [];
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showtodos();
});
