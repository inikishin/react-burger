import React, {useEffect} from "react";
import styles from "../components/app/app.module.css";

import Feed from "../components/feed/feed";
import FeedTotal from "../components/feed/feed-total";
import FeedOrdersStatus from "../components/feed/feed-orders-status";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../services/actions/ingredients";
import {WS_CONNECTION_START} from "../services/actions/feed";

function FeedPage() {
    const dispatch = useDispatch();
    const {orders, total, totalToday} = useSelector(store => ({...store.feed}));

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START });
    }, []);

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    return (
        <div className={styles.app}>
            <h1 className={`pl-5 pt-5 pb-1`}><span className="text text_type_main-large">Лента заказов</span></h1>
            <div className={styles.mainDashboard}>
                <div className={styles.sectionColumn}>
                    <Feed orders={orders}/>
                </div>
                <div className={styles.sectionColumn}>
                    <FeedOrdersStatus orders={orders} />
                    <FeedTotal title="Выполнено за все время:" count={total}/>
                    <FeedTotal title="Выполнено за сегодня:" count={totalToday}/>
                </div>
            </div>
        </div>
    )
}

export default FeedPage;