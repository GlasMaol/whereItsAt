import { useContext, useState, useEffect } from "react"
import { OrderContext } from "../../OrderContextProvider";
import './eventCalc.css'

function EventCalc({ event }) {
    const { addTickets, removeTickets } = useContext(OrderContext);
    const [ticketCount, setTicketCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setTotalPrice(event.price ? event.price * ticketCount : 0);
    }, [ticketCount, event.price]);

    // Läs från localStorage när komponenten laddas
    useEffect(() => {
        const savedCounts = JSON.parse(localStorage.getItem('ticketCounts')) || {};
        const eventTicketCount = savedCounts[event.id] || 0;
        setTicketCount(eventTicketCount);
    }, [event.id]);

    // Uppdatera localStorage när ticketCount ändras
    useEffect(() => {
        const savedCounts = JSON.parse(localStorage.getItem('ticketCounts')) || {};
        savedCounts[event.id] = ticketCount;
        localStorage.setItem('ticketCounts', JSON.stringify(savedCounts));
    }, [ticketCount, event.id]);

    const handleAddTicket = () => {
        addTickets(event.id, 1, event.price);
        setTicketCount(prev => {
            console.log(`Adding ticket: new count is ${prev + 1}`);
            return prev + 1;
        });
    };

    const handleRemoveTicket = () => {
        if (ticketCount > 0) {
            removeTickets(event.id, 1, event.price);
            setTicketCount(prev => {
                console.log(`Removing ticket: new count is ${prev - 1}`);
                return prev - 1;
            });   
        };
    }

    return (
        <div className="eventcalc__container">
            <span className="eventcalc__price">
                {ticketCount > 0 ? `${totalPrice}` : event.price ? `${event.price}` : 'Pris ej tillgänglig'}
            </span>
            <div className="eventcalc__controls">
                <button className="calc__btn"
                    onClick={handleRemoveTicket} disabled={!event.price}>
                    -
                </button>
                <span>
                    {ticketCount}
                </span>
                <button className="calc__btn"
                    onClick={handleAddTicket} disabled={!event.price}>
                    +
                </button>
            </div>
        </div>
    )
}

export default EventCalc
