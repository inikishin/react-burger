import React from "react";

import style from './model-overlay.module.css';
import PropTypes from "prop-types";

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

ModalOverlay.propTypes = {
    title: PropTypes.string,
    children: PropTypes.object,
    onClose: PropTypes.func
}

export default ModalOverlay;