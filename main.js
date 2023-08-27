const todoData = [];
const TABS = {
  all: "all",
  unCompleted: "unCompleted",
  completed: "done",
};
let activeTab = TABS.all;

const allTodoTab = document.querySelector("#allTodoTab");
const completedTodoTab = document.querySelector("#completedTodoTab");
const unCompletedTodoTab = document.querySelector("#unCompletedTodoTab");

function getUnCompletedTodos(todos) {
  return todos.filter((todo) => !todo.isCompleted);
}

function getCompletedTodos(todos) {
  return todos.filter((todo) => todo.isCompleted);
}

function renderUI(todos) {
  renderTabs();
  renderTodos(todos);
}

function styleActiveTab(tab) {
  tab.style.color = "#0759ee";
  tab.style.fontWeight = 700;

  tab.querySelector("span").style.backgroundColor = "#0759ee";
}

function styleTab(tab) {
  tab.style.color = "black";
  tab.style.fontWeight = "normal";

  tab.querySelector("span").style.backgroundColor =
    "rgba(128, 128, 128, 0.537)";
}

function renderTabs() {
  allTodoTab.querySelector("span").textContent = todoData.length;
  completedTodoTab.querySelector("span").textContent =
    getCompletedTodos(todoData).length;
  unCompletedTodoTab.querySelector("span").textContent =
    getUnCompletedTodos(todoData).length;

  styleTab(allTodoTab);
  styleTab(completedTodoTab);
  styleTab(unCompletedTodoTab);

  styleActiveTab(
    activeTab === TABS.all
      ? allTodoTab
      : activeTab === TABS.completed
      ? completedTodoTab
      : unCompletedTodoTab
  );
}

function getTabTodoData() {
  if (activeTab === TABS.all) return todoData;
  if (activeTab === TABS.unCompleted) return getUnCompletedTodos(todoData);

  return getCompletedTodos(todoData);
}

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
  renderUI(getTabTodoData());

  todoInput.value = "";
});

function renderTodoCard(todo, index) {
  const todoCard = document.createElement("div");
  todoCard.classList.add("todoCard");

  todoCard.innerHTML = `
  <div class="todo">
              <div class="task">
                <h2>${todo.content}</h2>
                 <p>crypto wallet redesign</p>
              </div>

              <div class="circle">
                <i class="fa ${
                  todo.isCompleted ? "fa-check" : ""
                }" aria-hidden="true"></i>
              </div>
            </div>

            <p>today <span>${todo.date.toLocaleTimeString()}</span></p>
  `;

  addIsCompletedToggleToCard(todoCard, index);

  return todoCard;
}

const addIsCompletedToggleToCard = (todoCard, index) => {
  const statusButton = todoCard.querySelector(".circle");
  statusButton.addEventListener("click", () => {
    todoData[index].isCompleted = !todoData[index].isCompleted;
    renderUI(getTabTodoData());
  });
};

function renderTodos(todos) {
  todoDisplay.innerHTML = "";
  todos.forEach((todo, index) => {
    todoDisplay.appendChild(renderTodoCard(todo, index));
  });
}

allTodoTab.addEventListener("click", () => {
  activeTab = TABS.all;
  renderUI(getTabTodoData(todoData));
});

completedTodoTab.addEventListener("click", () => {
  activeTab = TABS.completed;
  renderUI(getTabTodoData(todoData));
});

unCompletedTodoTab.addEventListener("click", () => {
  activeTab = TABS.unCompleted;
  renderUI(getTabTodoData(todoData));
});

renderUI();
