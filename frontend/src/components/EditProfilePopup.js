import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { PopupWithForm } from "./PopupWithForm";

export const EditProfilePopup = ({ isOpen, onClose, onUserUpdate }) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    }
    if (e.target.name === "about") {
      setDescription(e.target.value);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onUserUpdate({
      name: name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Редактировать профиль"
      name="edit"
      onSubmit={submitHandler}
      buttonText="Сохранить"
    >
      <input
        type="text"
        className="popup__input"
        id="name-input"
        name="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        onChange={handleChange}
        value={name || ""}
      />
      <span id="name-input-error" className="popup__input-error"></span>
      <input
        type="text"
        className="popup__input"
        id="description-input"
        name="about"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        onChange={handleChange}
        value={description || ""}
      />
      <span id="description-input-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
};