import React from 'react';
import { useOrderContext } from '../../OrderContextProvider';
import './orderCard.css'

function OrderCard({ order }) {
    const { removeOrder, addTickets, removeTickets } = useOrderContext();

    const handleIncrease = () => {
        addTickets(order.id, 1, order.price);
        console.log('ticket removed', addTickets);
    };

    const handleDecrease = () => {
        if (order.ticketCount > 1) {
            removeTickets(order.id, 1, order.price);
            console.log('removed ticket', removeTickets);
        } else {
            removeOrder(order.id);
        }
    };

    return (
        <div className="order-card__container">
            <span className="order-info_container">
                <p className='order__titel'>{order.name}</p>
                <p className='order__dates'>{order.date} {order.from} - {order.to}</p>
            </span>
            <div className='eventcalc__controls'>
                <button className="calc__btn btn__border-right" onClick={handleDecrease}>-</button>
                <span> {order.ticketCount} </span>
                <button className="calc__btn btn__border-left" onClick={handleIncrease}>+</button>
            </div>
        </div>
    );
}

export default OrderCard;