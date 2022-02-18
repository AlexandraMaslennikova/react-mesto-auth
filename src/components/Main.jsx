import React from "react";
import Card from "./Card";

import CurrentUserContext from "../contexts/CurrentUserContext";

function Main(props) {
  //получение данных пользователя
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__item">
          <button
            className="profile__avatar-btn"
            aria-label="Редактировать аватар профиля"
            onClick={props.onEditAvatar}
          ></button>
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Фотография профиля"
          />
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__edit-btn"
              aria-label="Редактировать имя и профессиию"
              onClick={props.onEditProfile}
            ></button>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-btn"
          aria-label="Добавить карточку"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="cards page__section">
        {props.cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
