import { useContext, useState, useEffect } from "react";
import { OrderContext } from "../../OrderContextProvider";
import './eventCalc.css';

function EventCalc({ event }) {
    if (!event) {
        return <div>Loading event data...</div>;
    }

    const { addTickets, removeTickets, ticketCounts, eventPrices } = useContext(OrderContext);
    console.log('ticketCounts', ticketCounts, event.id);
    const initialTicketCount = ticketCounts[event.id] || 0;
    const initialTotalPrice = eventPrices[event.id] || 0;
    const [ticketCount, setTicketCount] = useState(initialTicketCount);
    const [totalPrice, setTotalPrice] = useState(initialTotalPrice);

    useEffect(() => {
        if (event) {
            const savedTicketCount = ticketCounts[event.id] || 0;
            setTicketCount(savedTicketCount);
            const savedEventPrice = eventPrices[event.id] || 0;
            setTotalPrice(savedEventPrice);
        }
    }, [event, ticketCounts, eventPrices]);

    const handleAddTicket = () => {
        console.log('Current event add:', event);
        if (event) {
            addTickets(event.id, 1, event.price);
            setTicketCount(prevCount => prevCount + 1);
            setTotalPrice(prevPrice => prevPrice + event.price);
        }
    };

    const handleRemoveTicket = () => {
        console.log('Current event remove:', event);
        if (event && ticketCount > 0) {
            removeTickets(event.id, 1, event.price);
            setTicketCount(prevCount => prevCount - 1);
            setTotalPrice(prevPrice => prevPrice - event.price);
        }
    };

    return (
        <div className="eventcalc__container">
            <span className="eventcalc__price">
                {ticketCount > 0 ? totalPrice : (event && event.price !== undefined ? event.price : 'Pris ej tillgänglig')} sek
            </span>
            <div className="eventcalc__controls">
                <button className="calc__btn btn__border-right" onClick={handleRemoveTicket} disabled={!event}>-</button>
                <span className="ticket__nr">{ticketCount}</span>
                <button className="calc__btn btn__border-left" onClick={handleAddTicket} disabled={!event}>+</button>
            </div>
        </div>
    );
}

export default EventCalc;
