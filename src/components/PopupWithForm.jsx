import React from "react";

function PopupWithForm(props) {
  return (
    <article
      className={`popup popup_type_${props.name} 
        ${props.isOpen ? "popup_opened" : ""} `}
    >
      <div className="popup__conteiner">
        <button
          className="popup__close popup__close_type_edit"
          aria-label="Закрыть окно редактирования"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__form"
          name={props.name}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="popup__submit" type="submit">
            {props.buttonName}
          </button>
        </form>
      </div>
    </article>
  );
}

export default PopupWithForm;
