import React from "react";
import styles from './profile-orders-feed.module.css';
import {Link, useLocation} from "react-router-dom";
import FeedOrder from "../feed-order/feed-order";
import {TOrder} from "../../types";

interface IProfileOrdersFeedProps {
    orders: Array<TOrder>
};

function ProfileOrdersFeed(props: IProfileOrdersFeedProps) {
    const location = useLocation();

    return (
        <ul className={styles.ordersList}>
            {props.orders && props.orders.map((item) => (
                <Link to={{pathname: `/profile/orders/${item._id}`, state: {background: location}}}
                      className={styles.orderLink} key={item._id}>
                    <FeedOrder {...item} />
                </Link>
            ))}
        </ul>
    );
}

export default ProfileOrdersFeed;