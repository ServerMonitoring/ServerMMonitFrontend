import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./ProfileUser.scss";
import { RootState } from "../../state/store";
import { useTranslation } from "react-i18next";

export default function ProfileUser() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const {t} =useTranslation();
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
      <div className="user-avatar" id="user-avatar">
        <span>{username?.charAt(0).toUpperCase()}</span>
      </div>
      <h1>{t('Profile.h1')}</h1>
      <form className="password-form" onSubmit={handleSubmit}>
        <h2>{t('Profile.h2')}</h2>
        <label>
          {t('Profile.labelone')}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=""
          />
        </label>

        <label>
          {t('Profile.labeltwo')}
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder=""
          />
        </label>

        <label>
          {t('Profile.labelfree')}
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder=""
          />
        </label>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="save-btn">
          {t('Profile.button')}
        </button>
      </form>
    </div>
  );
}