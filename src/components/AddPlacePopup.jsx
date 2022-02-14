import React from "react";
import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const placeNameRef = useRef();
    const placeLinkRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name: placeNameRef.current.value,
            link: placeLinkRef.current.value
        });
    }

    return (
        <PopupWithForm
            name='add-card' 
            title='Новое место' 
            buttonName='Создать'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input popup__input_type_place"
                id="name"
                type="text"
                placeholder="Название"
                name="name"
                maxLength={30}
                ref={placeNameRef}
                required
            />
            <span id="name-error" className="error"></span>
            <input
                className="popup__input popup__input_type_link"
                id="link"
                type="url"
                placeholder="Ссылка на картинку"
                name="link"
                ref={placeLinkRef}
                required
            />
            <span id="link-error" className="error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;