const todoData = [];

const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoDisplay = document.querySelector("#todoDisplay");

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoInputValue = todoInput.value;

  todoData.push({
    content: todoInputValue,
    isCompleted: false,
    date: new Date(),
  });
  renderTodos(todoData);

  todoInput.value = "";
});

function renderTodoCard(todo) {
  const todoCard = document.createElement("div");
  todoCard.classList.add("todoCard");

  todoCard.innerHTML = `
  <div class="todo">
              <div class="task">
                <h2>${todo.content}</h2>
                 <p>crypto wallet redesign</p>
              </div>

              <div class="circle">
                <i class="fa fa-check" aria-hidden="true"></i>
              </div>
            </div>

            <p>today <span>${todo.date.toLocaleTimeString()}</span></p>
  `;

  return todoCard;
}

function renderTodos(todos) {
  todoDisplay.innerHTML = "";
  todos.forEach((todo) => {
    todoDisplay.appendChild(renderTodoCard(todo));
  });
}

const allTodoTab = document.querySelector("#allTodoTab");
const completedTodoTab = document.querySelector("#completedTodoTab");
const unCompletedTodoTab = document.querySelector("#unCompletedTodoTab");

allTodoTab.addEventListener("click", () => {
  renderTodos(todoData);
});

completedTodoTab.addEventListener("click", () => {
  const completedTodos = todoData.filter((todo) => todo.isCompleted);
  renderTodos(completedTodos);
});

unCompletedTodoTab.addEventListener("click", () => {
  const unCompletedTodos = todoData.filter((todo) => !todo.isCompleted);
  renderTodos(unCompletedTodos);
});
