import { Link } from "react-router-dom";
import { useState } from "react";

function Register({ handleRegistration }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(formData);
  };

  return (
    <form className="authform" onSubmit={handleSubmit}>
      <h1 className="authform__title">Регистрация</h1>
      <input
        className="authform__input"
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        className="authform__input"
        type="password"
        name="password"
        placeholder="Пароль"
        value={formData.password}
        onChange={handleChange}
      />
      <button
        className="authform__submit"
        type="submit"
      >
        Зарегистирироваться
      </button>
      <div>
        <p className="authform__subtitle">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="authform__link">
          Войти
        </Link>
      </div>
    </form>
  );
}

export default Register;
