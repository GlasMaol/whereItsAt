import { useState, useEffect } from "react";
import { useOrderContext } from "../../OrderContextProvider";
import './eventCalc.css';

function EventCalc({ event }) {
    const { addTickets, removeTickets, ticketCounts, totalPrices } = useOrderContext();
    const [localTicketCount, setLocalTicketCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (event) {
            const savedTicketCount = ticketCounts[event.eventId] || 0;
            setLocalTicketCount(savedTicketCount);
            const eventPrice = event.price || 0;
            const savedTotalPrice = savedTicketCount * eventPrice;
            setTotalPrice(event.price || 0);
        }
    }, [event, ticketCounts]);

    const handleAddTicket = () => {
        if (event) {
            addTickets(event.eventId, 1, event.price);
            setLocalTicketCount(prevCount => prevCount + 1);
            setTotalPrice(prevPrice => prevPrice + event.price);
        }
    };

    const handleRemoveTicket = () => {
        if (event && localTicketCount > 0) {
            removeTickets(event.eventId, 1, event.price);
            setLocalTicketCount(prevCount => prevCount - 1);
            setTotalPrice(prevPrice => prevPrice - event.price);
        }
    };

    return (
        <div className="eventcalc__container">
            <span className="eventcalc__price">
                {localTicketCount > 0 ? totalPrice * localTicketCount : (event && event.price !== undefined ? event.price : 'Pris ej tillgänglig')} sek
            </span>
            <div className="eventcalc__controls">
                <button className="calc__btn btn__border-right" onClick={handleRemoveTicket} disabled={!event}>-</button>
                <span className="ticket__nr">{localTicketCount}</span>
                <button className="calc__btn btn__border-left" onClick={handleAddTicket} disabled={!event}>+</button>
            </div>
        </div>
    );
}

export default EventCalc;






//older code
/*import { useState, useEffect } from "react";
import { useOrderContext } from "../../OrderContextProvider";
import './eventCalc.css';

function EventCalc({ event }) {
    if (!event) {
        return <div className="fault-message">Loading event data...</div>;
    }

    const { addTickets, removeTickets, ticketCounts } = useOrderContext();
    const [ticketCount, setTicketCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (event) {
            const savedTicketCount = ticketCounts[event.eventId] || 0;
            setTicketCount(savedTicketCount);
            setTotalPrice(event.price || 0);
        }
    }, [event, ticketCounts]);

    const handleAddTicket = () => {
        console.log('Before adding ticket: ticketCount:', ticketCount, 'totalPrice:', totalPrice);
        if (event) {
            addTickets(event.eventId, 1, event.price);
            setTicketCount(prevCount => prevCount + 1);
            setTotalPrice(prevPrice => prevPrice + event.price);
        }
        console.log('After adding ticket: ticketCount:', ticketCount, 'totalPrice:', totalPrice);
    };

    const handleRemoveTicket = () => {
        console.log('Before removing ticket: ticketCount:', ticketCount, 'totalPrice:', totalPrice);
        if (event && ticketCount > 0) {
            removeTickets(event.eventId, 1, event.price);
            setTicketCount(prevCount => prevCount - 1);
            setTotalPrice(prevPrice => prevPrice - event.price);
        }
        console.log('After removing ticket: ticketCount:', ticketCount, 'totalPrice:', totalPrice);
    };

    return (
        <div className="eventcalc__container">
            <span className="eventcalc__price">
            
               {ticketCount > 0 ? totalPrice * ticketCount : (event && event.price !== undefined ? event.price : 'Pris ej tillgänglig')} sek
            </span>
            <div className="eventcalc__controls">
                <button className="calc__btn btn__border-right" onClick={handleRemoveTicket} disabled={!event}>-</button>
                <span className="ticket__nr">{ticketCount}</span>
                <button className="calc__btn btn__border-left" onClick={handleAddTicket} disabled={!event}>+</button>
            </div>
        </div>
    );
}

export default EventCalc;*/
