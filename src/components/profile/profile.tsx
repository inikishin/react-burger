import React from "react";
import styles from './profile.module.css';
import ProfileMenu from "./profile-menu";
import ProfileSettings from "./profile-settings";


function Profile() {
    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileWrapper}>
                <ProfileMenu/>
                <ProfileSettings/>
            </div>
        </div>
    );
}

export default Profile;