import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function Card({ card, onCardClick, onLikeClick, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwner = card.owner._id === currentUser._id;
  const hasMyLike = card.likes.some((like) => like._id === currentUser._id);

  const handleClick = () => onCardClick(card);
  const handleLikeClick = () => onLikeClick(card);
  const handleDeleteClick = () => onDeleteClick(card);
  
    return (
        <div className="elements__card">
        {isOwner ? (
          <button className="elements__delete" type="button" onClick={handleDeleteClick}></button>
        ) : (
          <></>
        )}
        <img className="elements__img" src={card.link} alt={card.name} onClick={handleClick} />
        <div className="elements__row">
            <h2 className="elements__title">{card.name}</h2>
            <div className="elements__container-likes">
                <button className={hasMyLike ? "elements__button elements__button_active" : "elements__button"} type="button" onClick={handleLikeClick}></button>
                <span className="elements__button-count">{card.likes.length}</span>
            </div>
        </div>
    </div>
    );
  }