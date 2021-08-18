import React from 'react';
import styles from './feed-orders-status.module.css';
import PropTypes from "prop-types";

function FeedOrdersStatus(props) {
    const pendingOrders = props.orders.filter(item => item.status === 'pending').slice(0, 20);
    const doneOrders = props.orders.filter(item => item.status === 'done').slice(0, 20);

    return (
        <div className={styles.containerWrapper}>
            <div className={styles.statusContainer}>
                <h2 className="text text_type_main-medium">Готовы:</h2>
                <ul className={(doneOrders.length <= 10 ) ? styles.ordersListOneColumn : styles.ordersListTwoColumn}>
                    {
                        doneOrders.map((item) => (
                            <li className={`text text_type_digits-default ${styles.ordersDone}`} key={item._id}>{item.number}</li>
                            )
                        )
                    }
                </ul>
            </div>
            <div>
                <h2 className="text text_type_main-medium">В работе:</h2>
                <ul className={(pendingOrders.length <= 10 ) ? styles.ordersListOneColumn : styles.ordersListTwoColumn}>
                    {
                        pendingOrders.map((item) => (
                            <li className={`text text_type_digits-default ${styles.ordersWork}`} key={item._id}>{item.number}</li>
                            )
                        )
                    }
                </ul>
            </div>
        </div>
    );
}

FeedOrdersStatus.propsTypes = {
    orders: PropTypes.shape({
        _id: PropTypes.string,
        status: PropTypes.string,
        number: PropTypes.string
    })
};

export default FeedOrdersStatus;