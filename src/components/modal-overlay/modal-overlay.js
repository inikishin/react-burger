import React from "react";
import ReactDOM from 'react-dom';

import style from './model-overlay.module.css';
import PropTypes from "prop-types";

function ModalOverlay(props) {
    const modalRoot = document.getElementById("modal");

    return ReactDOM.createPortal((
        <div id="my-modal" className={style.modal} onClick={props.onClose}>
            {props.children}
        </div>
    ), modalRoot);
}

ModalOverlay.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func
}

export default ModalOverlay;