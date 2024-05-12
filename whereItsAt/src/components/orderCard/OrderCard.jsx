import { useState, useEffect } from 'react';
import { useOrderContext } from '../../OrderContextProvider';
import './orderCard.css'

function OrderCard({ order }) {
    const { removeOrder, addTickets, removeTickets, ticketCounts } = useOrderContext();
    const [localTicketCount, setLocalTicketCount] = useState(0);

useEffect(() => {
        const updatedCount = ticketCounts[order.eventId] || 0;
        setLocalTicketCount(updatedCount);
    }, [ticketCounts, order.eventId]);

    const handleIncrease = () => {
        addTickets(order.eventId, 1, order.price);
        setLocalTicketCount(localTicketCount + 1);
    };

    const handleDecrease = () => {
        if (localTicketCount > 1) {
            removeTickets(order.eventId, 1, order.price);
            setLocalTicketCount(localTicketCount - 1);
        } else {
            removeOrder(order.eventId);
        }
    };

    return (
        <div className="order-card__container">
            <span className="order-info_container">
                <p className='order__titel'>{order.name}</p>

                <p className='order__dates'>{order.date} {order.from} - {order.to}</p>
            </span>
            <div className='eventcalc__controls event-calc__height'>
                <button className="calc__btn btn__border-right" onClick={handleDecrease}>-</button>

                <span> {order.ticketCount} </span>

                <button className="calc__btn btn__border-left" onClick={handleIncrease}>+</button>
            </div>
        </div>
    );
}

export default OrderCard;