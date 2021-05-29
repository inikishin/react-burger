import React from "react";
import ReactDOM from 'react-dom';

import Modal from '../modal/modal';

import style from './model-overlay.module.css';
import PropTypes from "prop-types";

function ModalOverlay(props) {
    const modalRoot = document.getElementById("modal");

    return ReactDOM.createPortal((
        <div id="myModal" className={style.modal} onClick={props.onClose} onKeyUp={props.onClose}>
            <Modal title={props.title} onClose={props.onClose}>{props.children}</Modal>
        </div>
    ), modalRoot);
}

ModalOverlay.propTypes = {
    title: PropTypes.string,
    children: PropTypes.string,
    onClose: PropTypes.func
}

export default ModalOverlay;