import React from "react";
import OrderInfo from "../components/order-info/order-info";
import {useParams} from "react-router-dom";

function OrderInfoPage() {
    const responce = {
        "success": true,
        "orders": [
            {
                "ingredients": [
                    "60d3b41abdacab0026a733c6",
                    "60d3b41abdacab0026a733c9",
                    "60d3b41abdacab0026a733ce",
                    "60d3b41abdacab0026a733d0"
                ],
                "_id": "60d3463f7034a000269f45e7",
                "name": "Death Star Starship Main бургер",
                "status": "done",
                "number": "034535",
                "createdAt": "2021-06-23T14:43:22.587Z",
                "updatedAt": "2021-06-23T14:43:22.603Z"
            },
            {
                "ingredients": [
                    "60d3b41abdacab0026a733c6",
                    "60d3b41abdacab0026a733c9",
                    "60d3b41abdacab0026a733ce",
                    "60d3b41abdacab0026a733d0",
                    "60d3b41abdacab0026a733cf",
                    "60d3b41abdacab0026a733d4",
                    "60d3b41abdacab0026a733d2"
                ],
                "_id": "60d3463f7034a000269f45e8",
                "name": "Death Star Starship Main бургер 123",
                "status": "pending",
                "number": "034534",
                "createdAt": "2021-06-23T14:43:22.587Z",
                "updatedAt": "2021-06-23T14:43:22.603Z"
            },
            {
                "ingredients": [
                    "60d3b41abdacab0026a733c6",
                    "60d3b41abdacab0026a733c9",
                    "60d3b41abdacab0026a733ce",
                    "60d3b41abdacab0026a733d0",
                    "60d3b41abdacab0026a733d2"
                ],
                "_id": "60d3463f7034a000269f45e9",
                "name": "Death Star Starship Main бургер567",
                "status": "pending",
                "number": "034533",
                "createdAt": "2021-06-23T14:43:22.587Z",
                "updatedAt": "2021-06-23T14:43:22.603Z"
            },
            {
                "ingredients": [
                    "60d3b41abdacab0026a733c6",
                    "60d3b41abdacab0026a733cc",
                    "60d3b41abdacab0026a733ce",
                    "60d3b41abdacab0026a733d0"
                ],
                "_id": "60d3463f7034a000269f4510",
                "name": "Death Star Starship Main бургер abu",
                "status": "done",
                "number": "034532",
                "createdAt": "2021-06-23T14:43:22.587Z",
                "updatedAt": "2021-06-23T14:43:22.603Z"
            }
        ],
        "total": 15821,
        "totalToday": 158
    }

    const {id} = useParams();

    const order = responce.orders.find(item => item._id === id);
    return (
        <div className="mt-15" style={{display: "flex", justifyContent: "center"}}>
            <OrderInfo order={order}/>
        </div>
    );
}

export default OrderInfoPage;