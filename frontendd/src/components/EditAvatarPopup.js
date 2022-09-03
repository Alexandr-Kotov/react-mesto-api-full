import React, { useRef } from "react";
import { PopupWithForm } from "./PopupWithForm";

export const EditAvatarPopup = ({ isOpen, onClose, onAvatarUpdate }) => {
  const avatarRef = useRef();

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen])

  const submitHandler = (e) => {
    e.preventDefault();
    onAvatarUpdate({
      avatar: avatarRef.current.value,
    });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={submitHandler}
      title="Обновить автар"
      name="avatar"
      buttonText="Сохранить"
    >
      <input
        type="url"
        className="popup__input"
        id="card-link-input"
        name="avatarLink"
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}
      />
      <span id="card-link-input-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
};