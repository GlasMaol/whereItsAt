import React from 'react';
import { useOrderContext } from '../../OrderContextProvider';

function OrderCard({ order }) {
    const { updateOrder, removeOrder } = useOrderContext();

    const handleIncrease = () => {
        updateOrder(order.id, order.ticketCount + 1);
    };

    const handleDecrease = () => {
        if (order.ticketCount > 1) {
            updateOrder(order.id, order.ticketCount - 1);
        } else {
            removeOrder(order.id);
        }
    };

    return (
        <div className="order-card">
            <h3>{order.name}</h3>
            <p>{order.date} {order.from} - {order.to}</p>
            <div>
                <button onClick={handleDecrease}>-</button>
                <span> {order.ticketCount} </span>
                <button onClick={handleIncrease}>+</button>
            </div>
        </div>
    );
}

export default OrderCard;