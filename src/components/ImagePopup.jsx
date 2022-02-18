import React from "react";

function ImagePopup(props) {
  return (
    <article
      className={`popup popup_type_image ${
        props.card.name ? "popup_opened" : ""
      }`}
    >
      <figure className="popup__conteiner popup__conteiner_type_image">
        <button
          className="popup__close popup__close_type_image"
          aria-label="Закрыть окно редактирования"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__image"
          src={props.card.link}
          alt="Просмотр изображения"
        />
        <figcaption className="popup__title popup__title_type_image">
          {props.card.name}
        </figcaption>
      </figure>
    </article>
  );
}

export default ImagePopup;
