const initialState = {
    orders: [
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
    total: 15821,
    totalToday: 158
}

export const feed = (state = initialState, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
}