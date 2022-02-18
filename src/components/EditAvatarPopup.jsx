import React from "react";
import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonName="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_avatar"
        id="avatar"
        type="url"
        placeholder="Введите ссылку на аватар"
        name="avatar"
        ref={avatarRef}
        required
      />
      <span id="avatar-error" className="error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
