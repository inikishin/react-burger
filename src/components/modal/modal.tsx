import React, {MouseEventHandler, useEffect} from "react";
import ReactDOM from 'react-dom';

import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import style from './modal.module.css';
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("modal");

interface IModalProps {
    title: string,
    children: object,
    onClose: () => void
};

function Modal(props: IModalProps) {

    function onCloseModal(e: any): void {

        if ((e.target.id === 'my-modal') || (e.currentTarget.id === "close-modal") || (e.key === 'Escape')) {
            props.onClose();
            e.stopPropagation();
        }
    }

    function keyUpHandler() {
        props.onClose();
    };

    useEffect(() => {
        document.addEventListener('keyup', keyUpHandler);
        return () => {
            document.removeEventListener('keyup', keyUpHandler);
            }
    }, []);


    if (modalRoot) {
        return ReactDOM.createPortal(
        (
        <ModalOverlay onClose={() => onCloseModal} title="">
            <div id="modalContent" className={style.modalContent}>
                <div className={style.modalHeader}>
                    <h2 className="text text_type_main-medium">{props.title}</h2>
                    <span className={style.close} onClick={onCloseModal} id="close-modal"><CloseIcon type="primary"/></span>
                </div>
                <div className={style.modalMain}>{props.children}</div>
            </div>
        </ModalOverlay>
        ), modalRoot
    )
    }
    else {
        return (<></>)
    }

}

export default Modal;