import React from "react";
import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  //изменение названия места
  function handleChangeName(e) {
    setName(e.target.value);
  }

  //изменение картинки
  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonName="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_place"
        id="name"
        type="text"
        placeholder="Название"
        name="name"
        maxLength={30}
        value={name}
        onChange={handleChangeName}
        required
      />
      <span id="name-error" className="error"></span>
      <input
        className="popup__input popup__input_type_link"
        id="link"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        value={link}
        onChange={handleChangeLink}
        required
      />
      <span id="link-error" className="error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
