import { useState } from "react";

function Login({ handleLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(formData);
    setFormData({ email: "", password: "" });
  }

  return (
    <form className="authform" onSubmit={handleSubmit}>
      <h1 className="authform__title">Вход</h1>
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
      <button className="authform__submit">Войти</button>
    </form>
  );
}

export default Login;
