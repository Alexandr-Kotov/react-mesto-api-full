import { useEffect } from "react";

export function PopupWithForm({ title, name, children, isOpen, onClose, buttonText, onSubmit }){

  const handleEscClose = (e) => e.key === "Escape" && onClose(e);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
    }
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [isOpen]);

  return(
    <div className={isOpen ? `popup popup_${name} popup_opened` : `popup popup_${name}`} onClick={onClose}>
      <div className={`popup__content popup__content_${name}`}>
          <button className="popup__close" type="button"></button>
          <h2 className="popup__title">{title}</h2>
          <form className={`popup__form popup__form_${name}`} name={name} onSubmit={onSubmit}>
              {children}
              <button className={`popup__save popup__save${name}`} type="submit">{buttonText}</button>   
          </form>
      </div>
    </div>
  )
}