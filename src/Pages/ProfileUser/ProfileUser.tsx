import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./ProfileUser.scss";
import { RootState } from "../../state/store";

export default function ProfileUser() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Получаем ник из Redux
  const username = useSelector((state: RootState) => state.auth.user.username);

  // Обработчик отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    // Здесь можно добавить логику отправки данных на сервер
    console.log("Password changed successfully:", { password, newPassword });
    setError(""); // Очистка ошибки
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="profile-container">
      {/* Аватарка */}
      <div className="user-avatar" id="user-avatar">
        <span>{username?.charAt(0).toUpperCase()}</span>
      </div>

      {/* Заголовок */}
      <h1>Твой профиль</h1>

      {/* Форма для смены пароля */}
      <form className="password-form" onSubmit={handleSubmit}>
        <h2>Смена пароля</h2>

        {/* Текущий пароль */}
        <label>
          Текущий пароль:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите текущий пароль"
          />
        </label>

        {/* Новый пароль */}
        <label>
          Новый пароль:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Введите новый пароль"
          />
        </label>

        {/* Подтверждение нового пароля */}
        <label>
          Подтвердите новый пароль:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Подтвердите новый пароль"
          />
        </label>

        {/* Сообщение об ошибке */}
        {error && <p className="error-message">{error}</p>}

        {/* Кнопка отправки */}
        <button type="submit" className="save-btn">
          Сохранить изменения
        </button>
      </form>
    </div>
  );
}