import React from "react";
import { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  //получение данных пользователя
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  //изменение имени профиля
  function handleChangeName(e) {
    setName(e.target.value);
  }

  //изменение описания профиля
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  //обновление имени и информации о пользователе
  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonName="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_name"
        id="user-name"
        type="text"
        placeholder="Имя"
        name="name"
        value={name || ""}
        maxLength={40}
        onChange={handleChangeName}
        required
      />
      <span id="user-name-error" className="error"></span>
      <input
        className="popup__input popup__input_type_job"
        id="about"
        type="text"
        placeholder="Профессия"
        name="about"
        value={description || ""}
        onChange={handleChangeDescription}
        required
      />
      <span id="about-error" className="error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
