import React, { useState } from "react";
import { PopupWithForm } from "./PopupWithForm";

export const AddPlacePopup = ({ isOpen, onClose, onAddCard }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "cardName") {
      setName(e.target.value);
    }
    if (e.target.name === "cardLink") {
      setLink(e.target.value);
    }
  };

  React.useEffect(() => {
    setName('')
    setLink('')
  }, [isOpen])

  const submitHandler = (e) => {
    e.preventDefault();
    onAddCard({
      name,
      link,
    });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={submitHandler}
      title="Новое место"
      name="add"
      buttonText="Создать"
    >
      <input
        type="text"
        className="popup__input"
        id="card-name-input"
        name="cardName"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        onChange={handleChange}
        value={name}
      />
      <span id="card-name-input-error" className="popup__input-error"></span>
      <input
        type="url"
        className="popup__input"
        id="card-linkAvatar-input"
        name="cardLink"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChange}
        value={link}
      />
      <span id="card-linkAvatar-input-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
};