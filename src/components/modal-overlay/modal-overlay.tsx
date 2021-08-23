import React from "react";

import style from './model-overlay.module.css';

interface IModalOverlayProps {
    title: string,
    children: object,
    onClose: () => void
}
function ModalOverlay(props: IModalOverlayProps) {
    return (
        <div id="my-modal" className={style.modal} onClick={props.onClose}>
            {props.children}
        </div>
    );
}

export default ModalOverlay;