import React, {useState} from "react";
import PropTypes from 'prop-types';

import { CurrencyIcon, DragIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './burger-constructor.module.css';
import ModalOverlay from "../modal-overlay/modal-overlay";
import OrderDetails from "../order-details/order-details";

function BurgerConstructor(props) {

    const [modalVisible, setModalVisible] = useState(false);

    const openModal = (e) => {
        console.log(e);
        setModalVisible(true);
    }

    const closeModal = (e) => {
        console.log(e);
        setModalVisible(false);
    }

    const modal = (
        <ModalOverlay onClose={closeModal} title="">
            <OrderDetails />
        </ModalOverlay>
    );

    const bun = props.data.filter(x => (x.type === 'bun'))[0];
    const main = props.data.filter(x => (x.type !== 'bun'));

    return (
        <section style={{width: "50%"}}>
            <div className={`${style.bunLi} p-2 mr-5`}>
                {typeof bun !== 'undefined' && <ConstructorElement
                    type="top"
                    isLocked={true} text={bun.name} thumbnail={bun.image}
                    price={bun.price}/>}
            </div>
            <ul className={style.ul}>
                {main.map((ingr, index) => (
                    <li className={`${style.li} p-2`} key={ingr._id}>
                        <DragIcon/>
                        <ConstructorElement
                            isLocked={true} text={ingr.name} thumbnail={ingr.image}
                            price={ingr.price} style={{display: "block"}}/>
                    </li>
                ))}
            </ul>
            <div className={`${style.bunLi} p-2`}>
                {typeof bun !== 'undefined' && <ConstructorElement
                    type="bottom"
                    isLocked={true} text={bun.name} thumbnail={bun.image}
                    price={bun.price} style={{display: "block"}}/>}
            </div>

            <div className={`${style.footer} p-5`}>
                <p className="text text_type_digits-medium">1234 <CurrencyIcon/></p>
                <Button type="primary" size="large" onClick={openModal}>
                    Оформить заказ
                </Button>
                {modalVisible && modal}
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number
        }))
}

export default BurgerConstructor;