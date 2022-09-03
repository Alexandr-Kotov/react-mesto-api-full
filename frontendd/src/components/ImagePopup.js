import { useEffect } from "react";

export function ImagePopup({ onClose, card }) {
  const handleEscClose = (e) => e.key === "Escape" && onClose(e);

  useEffect(() => {
    if (card) {
      document.addEventListener("keydown", handleEscClose);
    }
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [card]);

  return (
    <div
    className={card ? `popup popup_big popup_opened` : `popup popup_big`}
    id="image_popup"
    onClick={onClose}
  >
      <div className="popup__preview">
          <button className="popup__close popup__close_big" type="button" onClick={onClose}></button>
          <figure className="popup__figure">
              <img className="popup__image" src={card?.link} alt={card?.name} />
              <figcaption className="popup__figcaption">{card?.name}</figcaption>
          </figure>
      </div>
    </div>
  );
}