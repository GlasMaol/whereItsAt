import { useState, useEffect } from 'react';
import { useOrderContext } from '../../OrderContextProvider';
import './orderCard.css'

function OrderCard({ order }) {
    const { removeOrder, addTickets, removeTickets, ticketCounts } = useOrderContext();
    const [localTicketCount, setLocalTicketCount] = useState(order.ticketCount);

    useEffect(() => {
        const updatedCount = ticketCounts[order.id] || 0;

        setLocalTicketCount(updatedCount);
    }, [ticketCounts, order.id]);

    const handleIncrease = () => {
        addTickets(order.id, 1, order.price);
        console.log('ticket added', addTickets);
        setLocalTicketCount(localTicketCount + 1);
    };

    const handleDecrease = () => {
        if (localTicketCount > 1) {
            removeTickets(order.id, 1, order.price);
            console.log('removed ticket', removeTickets);
            setLocalTicketCount(localTicketCount - 1);
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
            <div className='eventcalc__controls event-calc__height'>
                <button className="calc__btn btn__border-right" onClick={handleDecrease}>-</button>

                <span> {localTicketCount} </span>

                <button className="calc__btn btn__border-left" onClick={handleIncrease}>+</button>
            </div>
        </div>
    );
}

export default OrderCard;