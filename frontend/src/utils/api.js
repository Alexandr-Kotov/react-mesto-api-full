class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponse(res){
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }


  getProfile(){
    return fetch(`${this._baseUrl}/users/me`,{
      headers: this._headers,
      credentials: 'include',
    })  
    .then(this._handleResponse)
  }

  patchProfile(me) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(me),
    })
    .then(this._handleResponse)
  }

  getCardSever(){
    return fetch(`${this._baseUrl}/cards`,{
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._handleResponse)
  }

  postCardSever(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(card),
    })
    .then(this._handleResponse)
  }

  deleteCard(id){
    return fetch(`${this._baseUrl}/cards/${id}`,{
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._handleResponse)
  }


  toggleLike(cardId, hasMyLike) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: `${hasMyLike ? "DELETE" : "PUT"}`,
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._handleResponse)
  }


  addLike(id){
    return fetch(`${this._baseUrl}/cards/${id}/likes`,{
      method: 'PUT',
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._handleResponse)
  }


  patchAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ 
        avatar: avatarLink
      })
    })
    .then(this._handleResponse)
  }

  signup(singupPayload) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(singupPayload),
    })
    .then(this._handleResponse)
  }

  signin(signinPayload) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(signinPayload),
    })
    .then(this._handleResponse)
  }

  logout() {
    return fetch(`${this._baseUrl}/logout`, {
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._handleResponse)
  }
}


export const api = new Api({
  baseUrl: 'https://api.alexandr.kotov.students.nomoredomains.sbs',
  headers: {
    "Content-Type": "application/json"
  },
});