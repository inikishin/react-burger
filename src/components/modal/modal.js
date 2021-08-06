import React, {useEffect} from "react";
import ReactDOM from 'react-dom';

import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import style from './modal.module.css';
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("modal");

function Modal(props) {

    function onCloseModal(e) {
        if ((e.target.id === 'my-modal') || (e.currentTarget.id === "close-modal") || (e.key === 'Escape')) {
            props.onClose();
            e.stopPropagation();
        }
    }

    function keyUpHandler(e) {
                props.onClose(e);
            };

    useEffect(() => {
        document.addEventListener('keyup', keyUpHandler);
        return () => {
            document.removeEventListener('keyup', keyUpHandler);
            }
    }, []);

    return ReactDOM.createPortal(
        (
        <ModalOverlay onClose={onCloseModal}>
            <div id="modalContent" className={style.modalContent}>
                <div className={style.modalHeader}>
                    <h2 className="text text_type_main-medium">{props.title}</h2>
                    <span className={style.close} onClick={onCloseModal} id="close-modal"><CloseIcon/></span>
                </div>
                <div className={style.modalMain}>{props.children}</div>
            </div>
        </ModalOverlay>
        ), modalRoot
    )
}

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.string,
    onClose: PropTypes.func
}

export default Modal;