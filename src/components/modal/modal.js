import React, {useEffect} from "react";

import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import style from './modal.module.css';
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";

function Modal(props) {

    useEffect(() => {
        document.addEventListener('keyup', e => props.onClose(e));
        return document.removeEventListener('click', e => props.onClose(e));
    }, []);

    return (
        <ModalOverlay onClose={props.onClose}>
            <div id="modalContent" className={style.modalContent}>
                <div className={style.modalHeader}>
                    <h2 className="text text_type_main-medium">{props.title}</h2>
                    <span className={style.close} onClick={props.onClose} id="close-modal"><CloseIcon/></span>
                </div>
                <div className={style.modalMain}>{props.children}</div>
            </div>
        </ModalOverlay>
    )
}

Modal.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func
}

export default Modal;