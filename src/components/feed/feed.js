import React from "react";
import styles from './feed.module.css';
import {Link, useLocation} from "react-router-dom";
import FeedOrder from "../feed-order/feed-order";
import PropTypes from "prop-types";

function Feed(props) {
    const location = useLocation();

    return (
        <ul className={styles.ordersList}>
            {props.orders.map((item) => (
                <Link to={{pathname: `/feed/${item._id}`, state: {background: location}}} className={styles.orderLink}>
                    <FeedOrder {...item} key={item._id}/>
                </Link>
            ))}
        </ul>
    );
}

Feed.propsTypes = {
    orders: PropTypes.shape({
        _id: PropTypes.string
    })
};

export default Feed;