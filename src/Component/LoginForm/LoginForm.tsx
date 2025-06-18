import { useTranslation } from "react-i18next";
import "./LoginForm.scss";
import { useDispatch } from "react-redux";
import { login } from "../../state/slice/authslice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../API/authapi";
import { getUserProfile } from "../../API/userapi";
import { getPageElementByName } from "../../Data/UrlArray";

export default function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null); // Состояние для ошибки
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    try {
      // Сброс предыдущих ошибок
      setError(null);

      // Отправляем запрос на вход
      const credentials = { login: username, password };
      await signIn(credentials)
      .then(async (response)=>{
      await getUserProfile(response)
      .then((res)=>{
        dispatch(login({
        token: response,
        username: res.name,
        role: res.role
      }));
      })
      navigate("/server");
      })
    } catch (error) {
      console.error("Ошибка входа:", error);
      setError("Неверный логин или пароль");
    }
  };

  return (
    <div className="auth-content">
      <section className="login-section">
        <div className="login-card">
          <h2>{t('Login.H2')}</h2>
          <p>{t('Login.p')}</p>
          <form id="login-form" onSubmit={(e) =>{onSubmit(e)}}>
            <div className="input-group">
              <label htmlFor="username">{t('Login.labelName')}</label>
              <input
                type="text"
                id="username"
                placeholder={t('Login.inputName')}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">{t('Login.labelpassword')}</label>
              <input
                type="password"
                id="password"
                placeholder={t('Login.inputpassword')}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>} {/* Сообщение об ошибке */}
            <button type="submit" className="btn-primary">
              {t('Login.buttonname')}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}