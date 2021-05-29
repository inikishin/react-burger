import React from "react";

import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import style from './modal.module.css';
import PropTypes from "prop-types";

function Modal(props) {
    return (
        <div id="modalContent" className={style.modalContent}>
            <div className={style.modalHeader}>
                <h2 className="text text_type_main-medium">{props.title}</h2>
                <span className={style.close} onClick={props.onClose} onKeyUp={props.onClose}><CloseIcon /></span>
            </div>
            <div className={style.modalMain}>{props.children}</div>
        </div>
    )
}

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.string,
    onClose: PropTypes.func
}

export default Modal;