// script.js
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
  
    // Логика сохранения настроек
    const userSettingsForm = document.getElementById("user-settings-form");
    const designSettingsForm = document.getElementById("design-settings-form");
    const otherSettingsForm = document.getElementById("other-settings-form");
  
    userSettingsForm.addEventListener("submit", e => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      console.log("User Settings Saved:", { username, email, password });
      alert("User settings saved!");
    });
  
    designSettingsForm.addEventListener("submit", e => {
      e.preventDefault();
      const theme = document.getElementById("theme-selector").value;
      const fontSize = document.getElementById("font-size").value;
  
      console.log("Design Settings Applied:", { theme, fontSize });
      alert("Design settings applied!");
    });
  
    otherSettingsForm.addEventListener("submit", e => {
      e.preventDefault();
      const updateInterval = document.getElementById("update-interval").value;
      const notifications = document.getElementById("notifications").checked;
  
      console.log("Other Settings Saved:", { updateInterval, notifications });
      alert("Other settings saved!");
    });
  });