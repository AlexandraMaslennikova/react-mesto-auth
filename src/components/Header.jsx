import { Route, Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header page__section">
      <a className="header__logo" href="#" target="_blank" rel="noopener"></a>
      <div className="header__section">
        {props.loggedIn && (
          <Route exact path="/">
            <p className="header__email">{props.userEmail}</p>
            <Link
              to="/sign-in"
              className="header__logout-button"
              onClick={props.onLogout}
            >
              Выйти
            </Link>
          </Route>
        )}
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        </Route>
      </div>
    </header>
  );
}

export default Header;
