import React from "react";
import { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import "../index.css";
import successfulImage from "../images/successfulImage.png";
import unsuccessfulImage from "../images/unsuccessfulImage.png";

import api from "../utils/api";
import * as auth from "../utils/auth";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";

import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  //создание стейтов:
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  //карточки
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  //данные пользователя
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState("");

  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);

  //сообщение о результате регистрации
  const [message, setMessage] = useState("");
  const [tooltipImage, setTooltipImage] = useState("");

  //регистрация пользователя
  function handleRegistration(formData) {
    auth
      .register(formData.email, formData.password)
      .then(() => {
        setTooltipImage(successfulImage);
        setMessage("Вы успешно зарегистрировались!");
        handleInfoTooltipClick();
        history.push("/sign-in");
      })
      .catch((error) => {
        handleInfoTooltipClick();
        setTooltipImage(unsuccessfulImage);
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");
        if (error === "Ошибка: 400") {
          console.log("Некорректно заполнено одно из полей");
        }
      });
  }

  //вход в аккаунт
  function handleLogin(formData) {
    auth
      .authorize(formData.email, formData.password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        setUserEmail(formData.email);
        history.push("/");
      })
      .catch((error) => {
        handleInfoTooltipClick();
        setTooltipImage(unsuccessfulImage);
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");
        if (error === "Ошибка: 400") {
          console.log("Не передано одно из полей");
        } else if (error === "Ошибка: 401") {
          console.log("Пользователь с данным email не найден");
        }
      });
  }

  //проверка токена
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      auth
        .checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          history.push("/");
        })
        .catch((err) => console.log(err));
    } else {
      setLoggedIn(false);
    }
  }, []);

  //выход из аккаунта
  function logout() {
    setLoggedIn(false);
    localStorage.removeItem("token");
    history.push("/sign-in");
  }

  //получение данных о пользователе
  useEffect(() => {
    api
      .getUserInformation()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => {
        console.log("Ошибка получения данных пользователя", error);
      });
  }, []);

  //загрузка данных карточек
  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((error) => {
        console.log("Ошибка получения данных карточки", error);
      });
  }, []);

  //добавление новой карточки
  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log("Ошибка добавления новой карточки", error);
      });
  }

  //лайк
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log("Ошибка лайка", error);
      });
  }

  //удаление карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        console.log("Ошибка удаления карточки", error);
      });
  }

  //обновление данных о пользователе
  function handleUpdateUser(data) {
    api
      .editUserInformation(data)
      .then((dataUser) => {
        setCurrentUser(dataUser);
        closeAllPopups();
      })
      .catch((error) => {
        console.log("Ошибка обновления данных о пользователе", error);
      });
  }

  //обновление аватара пользователя
  function handleUpdateAvatar(data) {
    api
      .changeAvatar(data)
      .then((dataAvatar) => {
        setCurrentUser(dataAvatar);
        closeAllPopups();
      })
      .catch((error) => {
        console.log("Ошибка обновления аватара", error);
      });
  }

  //открытие окна информации о состоянии регистрации
  function handleInfoTooltipClick() {
    setIsInfoTooltipOpen(true);
  }

  //открытие окна редактироования аватар
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  //открытие окна редактирования профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  //открытие окна дабавления новой карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  //открытие окна просмотра карточки
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  //закрытие всех модальных окон
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  //закрытие окон нажатием на Escape
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header loggedIn={loggedIn} userEmail={userEmail} onLogout={logout} />

          <Switch>
            <ProtectedRoute exact path={"/"} loggedIn={loggedIn}>
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            </ProtectedRoute>
            <Route path="/sign-up">
              <Register handleRegistration={handleRegistration} />
            </Route>
            <Route path="/sign-in">
              <Login handleLogin={handleLogin} />
            </Route>
          </Switch>

          <Footer />

          <InfoTooltip
            image={tooltipImage}
            message={message}
            loggedIn={loggedIn}
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <PopupWithForm name="confirm" title="Вы уверены" buttonName="Да" />
          <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
