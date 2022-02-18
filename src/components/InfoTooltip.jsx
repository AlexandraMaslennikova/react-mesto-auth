function InfoTooltip(props) {
  return (
    <article
      className={`popup popup_type_infoTooltip ${
        props.isOpen ? "popup_opened" : ""
      } `}
    >
      <div className="popup__conteiner popup__conteiner_type_infoTooltip">
        <button
          className="popup__close popup__close_type_infoTooltip"
          aria-label="Закрыть окно редактирования"
          onClick={props.onClose}
        ></button>
        <img className="popup__image" src={props.image} alt="Информация" />
        <p className="popup__title popup__title_type_infoTooltip">
          {props.message}
        </p>
      </div>
    </article>
  );
}

export default InfoTooltip;
