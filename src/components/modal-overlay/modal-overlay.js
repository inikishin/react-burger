import React from "react";

import style from './model-overlay.module.css';
import PropTypes from "prop-types";

function ModalOverlay(props) {
    return (
        <div id="my-modal" className={style.modal} onClick={props.onClose}>
            {props.children}
        </div>
    );
}

ModalOverlay.propTypes = {
    title: PropTypes.string,
    children: PropTypes.string,
    onClose: PropTypes.func
}

export default ModalOverlay;