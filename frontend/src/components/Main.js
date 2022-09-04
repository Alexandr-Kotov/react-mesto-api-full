import React, { useContext} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Card } from "./Card";

export function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete,}) {
  const currentUserContext = useContext(CurrentUserContext);

  const section = () => {
    if (cards.length > 0) {
      return cards.map((card) => (
        <Card
          card={card}
          onCardClick={onCardClick}
          onLikeClick={onCardLike}
          onDeleteClick={onCardDelete}
          key={`card${card._id}`}
        />
      ));
  }
  };
  
  return(
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <img className="profile__avatar" src={currentUserContext?.avatar} alt="Фото профиля" />
          <div className="profile__avatar-owner" onClick={onEditAvatar}></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUserContext?.name}</h1>
          <button className="profile__button-edit" type="button" onClick={onEditProfile}></button>
          <p className="profile__subtitle">{currentUserContext?.about}</p>
        </div>
        <button className="profile__button-add" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        {section()}
      </section>
    </main>
  )
};

export default Main