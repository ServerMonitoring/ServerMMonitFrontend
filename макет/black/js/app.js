// script.js
document.addEventListener("DOMContentLoaded", () => {
    const ctxCpu = document.getElementById("cpu-chart").getContext("2d");
    const ctxMemory = document.getElementById("memory-chart").getContext("2d");
  
    // Пример данных для графиков
    const cpuData = [20, 40, 60, 80, 70, 90, 50];
    const memoryData = [50, 60, 70, 80, 90, 100, 85];
    const labels = ["1s", "2s", "3s", "4s", "5s", "6s", "7s"];
  
    // Создание графиков
    new Chart(ctxCpu, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: "CPU Usage (%)",
          data: cpuData,
          borderColor: "#ff6384",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: true,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  
    new Chart(ctxMemory, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Memory Usage (%)",
          data: memoryData,
          backgroundColor: "#36a2eb",
          borderColor: "#36a2eb",
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  
    // Навигация между страницами
    const pages = document.querySelectorAll(".page");
    const navLinks = document.querySelectorAll(".netdata-header nav a");
  
    function showPage(pageId) {
      pages.forEach(page => page.classList.remove("active"));
      document.getElementById(pageId).classList.add("active");
    }
  
    navLinks.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const pageId = e.target.getAttribute("href").substring(1);
        showPage(pageId);
      });
    });
  
    // Добавление серверов
    const addServerForm = document.getElementById("add-server-form");
    const serverList = document.getElementById("server-list");
  
    addServerForm.addEventListener("submit", e => {
      e.preventDefault();
      const serverName = document.getElementById("server-name").value;
      const serverUrl = document.getElementById("server-url").value;
  
      if (serverName && serverUrl) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = serverName;
        a.setAttribute("data-server", serverName);
        li.appendChild(a);
        serverList.appendChild(li);
  
        // Очистка формы
        addServerForm.reset();
      }
    });
  
    // Настройки темы и интервала обновления
    const settingsForm = document.getElementById("settings-form");
    const themeSelector = document.getElementById("theme-selector");
  
    settingsForm.addEventListener("submit", e => {
      e.preventDefault();
      const theme = themeSelector.value;
      document.body.style.backgroundColor = theme === "dark" ? "#1e1e1e" : "#ffffff";
      document.body }
)})
