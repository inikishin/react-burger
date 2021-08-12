import React, {useEffect} from "react";
import styles from './profile.module.css';
import ProfileMenu from "./profile-menu";
import ProfileOrdersFeed from "./profile-orders-feed";
import {WS_CONNECTION_START} from "../../services/actions/feed";
import {useDispatch, useSelector} from "react-redux";
import {getCookie} from "../../utils/cookies";


function ProfileOrders() {
    const dispatch = useDispatch();
    const {orders} = useSelector(store => ({...store.feed}));

    useEffect(() => {
        dispatch({type: WS_CONNECTION_START, payload: getCookie('token')})
    }, []);

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileWrapper}>
                <ProfileMenu/>
                <div className={styles.feedWrapper}>
                    <ProfileOrdersFeed orders={orders}/>
                </div>
            </div>
        </div>
    );
}

export default ProfileOrders;