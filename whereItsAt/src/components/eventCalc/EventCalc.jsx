/*import { useOrderContext } from '../../OrderContextProvider';
import { useState } from 'react';
import OrderCard from '../orderCard/OrderCard';


function EventCalc({ event }) {
    if (!event) {
        return <div>Loading event data...</div>;
    }

    const { addTickets, removeTickets, ticketCounts, eventPrices } = useOrderContext();
    const initialTicketCount = ticketCounts[event.id] || 0;
    const initialTotalPrice = 0; // Set initial total price to 0
    const [ticketCount, setTicketCount] = useState(initialTicketCount);
    const [totalPrice, setTotalPrice] = useState(initialTotalPrice);

    const handleAddTicket = () => {
        if (event) {
            addTickets(event.id, 1, event.price);
            setTicketCount(prevCount => prevCount + 1);
            setTotalPrice(prevPrice => prevPrice + event.price);
        }
    };

    const handleRemoveTicket = () => {
        if (event && ticketCount > 0) {
            removeTickets(event.id, 1, event.price);
            setTicketCount(prevCount => prevCount - 1);
            setTotalPrice(prevPrice => prevPrice - event.price);
        }
    };

    return (
        <div className="eventcalc__container">
            
            <OrderCard event={event} ticketCount={ticketCount} />
            <div className="eventcalc__controls">
                <button className="calc__btn btn__border-right" onClick={handleRemoveTicket} disabled={!event}>-</button>
                <span className="ticket__nr">{ticketCount}</span>
                <button className="calc__btn btn__border-left" onClick={handleAddTicket} disabled={!event}>+</button>
            </div>
        </div>
    );
}

export default EventCalc;*/

import { useContext, useState, useEffect } from "react";
import { OrderContext } from "../../OrderContextProvider";
import './eventCalc.css';

function EventCalc({ event }) {
    if (!event) {
        return <div>Loading event data...</div>;
    }

    const { addTickets, removeTickets, ticketCounts, eventPrices } = useContext(OrderContext);
    /*console.log('ticketCounts', ticketCounts, event.id);*/
    /*const initialTicketCount = ticketCounts[event.id] || 0;
    const initialTotalPrice = event.price || 0;*/
    const [ticketCount, setTicketCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (event) {
            const savedTicketCount = ticketCounts[event.id] || 0;
            setTicketCount(savedTicketCount);
            setTotalPrice(event.price || 0);
        }
    }, [event, ticketCounts]);

    const handleAddTicket = () => {
        console.log('Before adding ticket: ticketCount:', ticketCount, 'totalPrice:', totalPrice);
        if (event) {
            addTickets(event.id, 1, event.price);
            setTicketCount(prevCount => prevCount + 1);
            setTotalPrice(prevPrice => prevPrice + event.price);
        }
        console.log('After adding ticket: ticketCount:', ticketCount, 'totalPrice:', totalPrice);
    };

    const handleRemoveTicket = () => {
        console.log('Before removing ticket: ticketCount:', ticketCount, 'totalPrice:', totalPrice);
        if (event && ticketCount > 0) {
            removeTickets(event.id, 1, event.price);
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

export default EventCalc;
