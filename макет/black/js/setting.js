// app.js
document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  // Переключение вкладок
  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      const targetTab = button.getAttribute("data-tab");

      // Убираем активный класс у всех кнопок и содержимого
      tabButtons.forEach(btn => btn.classList.remove("active"));
      tabContents.forEach(content => content.classList.remove("active"));

      // Добавляем активный класс к выбранной вкладке и её содержимому
      button.classList.add("active");
      document.getElementById(targetTab).classList.add("active");
    });
  });

  // Логика добавления серверов
  const addServerForm = document.getElementById("add-server-form");
  const serverList = document.getElementById("server-list");

  addServerForm.addEventListener("submit", e => {
    e.preventDefault();
    const serverName = document.getElementById("server-name").value.trim();
    const serverUrl = document.getElementById("server-url").value.trim();

    if (serverName && serverUrl) {
      addServer(serverName, serverUrl);
      addServerForm.reset();
    } else {
      alert("Please fill in both fields.");
    }
  });

  // Функция для добавления сервера в список
  function addServer(name, url) {
    const li = document.createElement("li");
    li.classList.add("server-item");

    const serverInfo = document.createElement("span");
    serverInfo.textContent = `${name} (${url})`;

    const actions = document.createElement("div");
    actions.classList.add("server-actions");

    const editButton = document.createElement("button");
    editButton.innerHTML = "✏️"; // Иконка редактирования
    editButton.title = "Edit";
    editButton.addEventListener("click", () => editServer(li, name, url));

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "🗑️"; // Иконка удаления
    deleteButton.title = "Delete";
    deleteButton.addEventListener("click", () => deleteServer(li));

    actions.appendChild(editButton);
    actions.appendChild(deleteButton);

    li.appendChild(serverInfo);
    li.appendChild(actions);

    serverList.appendChild(li);
  }

  // Функция для удаления сервера
  function deleteServer(serverItem) {
    if (confirm("Are you sure you want to delete this server?")) {
      serverItem.remove();
    }
  }

  // Функция для редактирования сервера
  function editServer(serverItem, currentName, currentUrl) {
    const newName = prompt("Enter new server name:", currentName);
    const newUrl = prompt("Enter new server URL:", currentUrl);

    if (newName && newUrl) {
      const serverInfo = serverItem.querySelector("span");
      serverInfo.textContent = `${newName} (${newUrl})`;
    }
  }
});