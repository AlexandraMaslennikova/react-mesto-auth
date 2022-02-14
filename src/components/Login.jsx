import { useState } from "react";

function Login({ handleLogin }) {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
        });
    
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        handleLogin(formData);
        setFormData({ email: '', password: '' });
    }
    
    return(
        <form className="authform" onSubmit={handleSubmit}>
            <h1 className="authform__title">Вход</h1>
            <input 
                className="authform__input"
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
            />
            <input 
                className="authform__input"
                type="password"
                name="password"
                placeholder="Пароль"
                onChange={handleChange}
            />
            <button className="authform__submit" onSubmit={handleSubmit}>Войти</button>
        </form>
    )
}

export default Login;