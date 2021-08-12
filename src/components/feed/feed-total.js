import React from "react";
import PropTypes from 'prop-types';

function FeedTotal(props) {
    return (
        <div className="mb-15">
            <h2 className="text text_type_main-medium">{props.title}</h2>
            <p className="text text_type_digits-large">{props.count}</p>
        </div>
    );
}

FeedTotal.propsTypes = {
    title: PropTypes.string,
    count: PropTypes.number
};

export default FeedTotal;