import React from 'react';
import styles from './feed-orders-status.module.css';

function FeedOrdersStatus(props) {
    const pendingOrders = props.orders.filter(item => item.status === 'pending');
    const doneOrders = props.orders.filter(item => item.status === 'done');

    return (
        <div className={styles.containerWrapper}>
            <div className={styles.statusContainer}>
                <h2 className="text text_type_main-medium">Готовы:</h2>
                <ul className={styles.ordersList}>
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
                <ul className={styles.ordersList}>
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

export default FeedOrdersStatus;