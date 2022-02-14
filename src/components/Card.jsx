import React from "react";
import CurrentUserContext from '../contexts/CurrentUserContext';


function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);

    //открытие модального окна с картинкой
    function handleClick() {
      props.onCardClick(props.card);
    };

    //лайк
    function handleLikeClick() {
      props.onCardLike(props.card)
    }

    //удаление карточки
    function handleDeleteClick() {
      props.onCardDelete(props.card)
    }

    //сравнение id создателя карточки и пользователя
    const isOwn = props.card.owner._id === currentUser._id;

    //переменная для класса кнопки удаления
    const cardDeleteButtonClassName = (`card__delete ${isOwn ? "" : "card__delete_type_hidden"}`);

    //определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    //переменная класса кнопки лайка
    const cardLikeButtonClassName = (`card__like ${isLiked ? "card__like_color_black" : ""}`);

    return ( 
          <article className="card">
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <img className="card__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
            <div className="card__content">
              <h2 className="card__title">{props.card.name}</h2>
              <div>
                <button 
                  className={cardLikeButtonClassName}
                  type="button"
                  aria-label="Нравится"
                  onClick={handleLikeClick}
                >
                </button>
                <p className="card__likesCounter">{props.card.likes.length}</p>
              </div>
            </div>
          </article>
    )
}

export default Card;