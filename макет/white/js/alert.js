// script.js
document.addEventListener("DOMContentLoaded", () => {
    const alertList = document.getElementById("alert-list");
    const notificationBadge = document.getElementById("notification-badge");
  
    // Функция для удаления уведомления
    function dismissAlert(alertId) {
      const alertItem = document.querySelector(`[data-alert-id="${alertId}"]`).closest(".alert-item");
      if (alertItem) {
        alertItem.remove();
        updateNotificationBadge();
      }
    }
  
    // Обновление счетчика уведомлений
    function updateNotificationBadge() {
      const alerts = alertList.querySelectorAll(".alert-item");
      const count = alerts.length;
      notificationBadge.textContent = count;
  
      // Если уведомлений нет, скрываем бейдж
      if (count === 0) {
        notificationBadge.style.display = "none";
      } else {
        notificationBadge.style.display = "flex";
      }
    }
  
    // Добавляем обработчики для кнопок "Dismiss"
    alertList.addEventListener("click", e => {
      if (e.target.classList.contains("dismiss-alert")) {
        const alertId = e.target.getAttribute("data-alert-id");
        dismissAlert(alertId);
      }
    });
  
    // Инициализация счетчика уведомлений
    updateNotificationBadge();
  });