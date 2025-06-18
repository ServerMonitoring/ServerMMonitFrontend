// app.js
document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");
  
    // Переключение вкладок
    tabButtons.forEach(button => {
      button.addEventListener("click", () => {
        const targetTab = button.getAttribute("data-tab");
  
        tabButtons.forEach(btn => btn.classList.remove("active"));
        tabContents.forEach(content => content.classList.remove("active"));
  
        button.classList.add("active");
        document.getElementById(targetTab).classList.add("active");
      });
    });
  
    // Модальные окна
    const userModal = document.getElementById("user-modal");
    const serverModal = document.getElementById("server-modal");
    const addUserBtn = document.getElementById("add-user-btn");
    const addServerBtn = document.getElementById("add-server-btn");
  
    // Открытие модальных окон
    addUserBtn.addEventListener("click", () => {
      userModal.style.display = "block";
    });
  
    addServerBtn.addEventListener("click", () => {
      serverModal.style.display = "block";
    });
  
    // Закрытие модальных окон
    document.querySelectorAll(".close").forEach(closeBtn => {
      closeBtn.addEventListener("click", () => {
        userModal.style.display = "none";
        serverModal.style.display = "none";
      });
    });
  
    window.addEventListener("click", e => {
      if (e.target === userModal) userModal.style.display = "none";
      if (e.target === serverModal) serverModal.style.display = "none";
    });
  
    // Логика добавления пользователей
    const usersList = document.getElementById("users-list");
    const addUserForm = document.getElementById("add-user-form");
  
    addUserForm.addEventListener("submit", e => {
      e.preventDefault();
      const username = document.getElementById("new-username").value.trim();
      const email = document.getElementById("new-email").value.trim();
      const password = document.getElementById("new-password").value.trim();
  
      if (username && email && password) {
        addUser(username, email);
        addUserForm.reset();
        userModal.style.display = "none";
      } else {
        alert("Please fill in all fields.");
      }
    });
  
    function addUser(username, email) {
      const row = document.createElement("tr");
  
      const idCell = document.createElement("td");
      idCell.textContent = usersList.children.length + 1;
  
      const usernameCell = document.createElement("td");
      usernameCell.textContent = username;
  
      const emailCell = document.createElement("td");
      emailCell.textContent = email;
  
      const actionsCell = document.createElement("td");
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => editUser(row, username, email));
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteUser(row));
  
      actionsCell.appendChild(editButton);
      actionsCell.appendChild(deleteButton);
  
      row.appendChild(idCell);
      row.appendChild(usernameCell);
      row.appendChild(emailCell);
      row.appendChild(actionsCell);
  
      usersList.appendChild(row);
    }
  
    function editUser(row, currentUsername, currentEmail) {
      const newUsername = prompt("Enter new username:", currentUsername);
      const newEmail = prompt("Enter new email:", currentEmail);
  
      if (newUsername && newEmail) {
        row.cells[1].textContent = newUsername;
        row.cells[2].textContent = newEmail;
      }
    }
  
    function deleteUser(row) {
      if (confirm("Are you sure you want to delete this user?")) {
        row.remove();
        updateRowNumbers(usersList);
      }
    }
  
    function updateRowNumbers(tableBody) {
      Array.from(tableBody.children).forEach((row, index) => {
        row.cells[0].textContent = index + 1;
      });
    }
  
    // Логика добавления серверов
    const serversList = document.getElementById("servers-list");
    const addServerForm = document.getElementById("add-server-form");
  
    addServerForm.addEventListener("submit", e => {
      e.preventDefault();
      const serverName = document.getElementById("new-server-name").value.trim();
      const serverUrl = document.getElementById("new-server-url").value.trim();
  
      if (serverName && serverUrl) {
        addServer(serverName, serverUrl);
        addServerForm.reset();
        serverModal.style.display = "none";
      } else {
        alert("Please fill in all fields.");
      }
    });
  
    function addServer(name, url) {
      const row = document.createElement("tr");
  
      const idCell = document.createElement("td");
      idCell.textContent = serversList.children.length + 1;
  
      const nameCell = document.createElement("td");
      nameCell.textContent = name;
  
      const urlCell = document.createElement("td");
      urlCell.textContent = url;
  
      const actionsCell = document.createElement("td");
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => editServer(row, name, url));
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteServer(row));
  
      actionsCell.appendChild(editButton);
      actionsCell.appendChild(deleteButton);
  
      row.appendChild(idCell);
      row.appendChild(nameCell);
      row.appendChild(urlCell);
      row.appendChild(actionsCell);
  
      serversList.appendChild(row);
    }
  
    function editServer(row, currentName, currentUrl) {
      const newName = prompt("Enter new server name:", currentName);
      const newUrl = prompt("Enter new server URL:", currentUrl);
  
      if (newName && newUrl) {
        row.cells[1].textContent = newName;
        row.cells[2].textContent = newUrl;
      }
    }
  
    function deleteServer(row) {
      if (confirm("Are you sure you want to delete this server?")) {
        row.remove();
        updateRowNumbers(serversList);
      }
    }
  });