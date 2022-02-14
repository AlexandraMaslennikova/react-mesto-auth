class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }

    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    }

    //загрузка начальных карточек
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
          method: "GET",
          headers: this._headers
      })
      .then(this._checkResponse);
    }

    //получение информации о пользователе
    getUserInformation() {
      return fetch(`${this._baseUrl}/users/me`, {
          method: "GET",
          headers: this._headers
      })
      .then(this._checkResponse);
    }
  
    //редактирование информации о пользователе
    editUserInformation(user) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: user.name,
          about: user.about
        })
      })
      .then(this._checkResponse);
    }

    //добавление карточек
    addNewCard(dataCard) {
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: dataCard.name,
          link: dataCard.link
        })
    })
      .then(this._checkResponse);
    }

    //лайк карточки
    changeLikeCardStatus(cardId, isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: isLiked ? 'DELETE' : 'PUT',
        headers: this._headers
    })
    .then(this._checkResponse);
    }

    //удаление карточек
    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers
      })
    .then(this._checkResponse);
    }

    //обновление аватара
    changeAvatar(avatarLink) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatarLink.avatar,
        })
      })
    .then(this._checkResponse);
    }
};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-32',
  headers: {
    authorization: '9a7c5134-d1e8-4b2f-8e23-3242adc9d84c',
    'content-Type': 'application/json'
  }
}); 

export default api;