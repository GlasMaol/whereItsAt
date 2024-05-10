import { useOrderContext } from '../../OrderContextProvider';
import EventCalc from '../eventCalc/EventCalc';
import './eventCard.css';

function EventCard({ event, addEventTicket }) {
    const { addOrder, orders } = useOrderContext();

    const handleAddToCart = () => {
        /*console.log('event to add to cart', event);*/
        if (event) {
            const existingOrderIndex = orders.findIndex(order => order.id === event.eventId);
            const newTicketCount = (existingOrderIndex !== -1) ? orders[existingOrderIndex].ticketCount + 1 : 1;
            /*console.log('newTicketCount', newTicketCount);*/
            const totalPrice = newTicketCount * event.price;
    
            const order = {
                id: event.eventId,
                name: event.name,
                where: event.where,
                date: event.when ? event.when.date : 'Inget datum tillgängligt',
                from: event.when ? event.when.from : 'Inget datum tillgängligt',
                to: event.when ? event.when.to : 'Inget datum tillgängligt',
                price: event.price || 0,
                ticketCount: newTicketCount,
                totalPrice: totalPrice
            };
    
            addOrder(order);
            /*console.log('Added order:', order);*/
        }
    };

    if (!event) {
        return <p>Ingen eventdata tillgänglig</p>;
    }
    
    return (
        <div className="event-card">
            <section className='details__container'>
                <h1>{event.name}</h1>
                <p className='single-event__when'>
                    {event.when ? `${event.when.date} ${event.when.from} - ${event.when.to}` : 'Inget datum tillgängligt'}
                </p>
                <p className='single-event__where'>
                    @ {event.where || 'Ingen plats angiven'}
                </p>
            </section>

            <section className='tickets__container'>
                <EventCalc event={event} addEventTicket={addEventTicket} />
            </section>

            <section className="btn__container">
                <button className='btn__styling' onClick={handleAddToCart}>Lägg i varukorgen</button>
            </section>
        </div>
    );
}

export default EventCard;

/*import { useOrderContext } from '../../OrderContextProvider';
import { useEffect } from 'react';
import EventCalc from '../eventCalc/EventCalc';
import './eventCard.css';
import useApiStore from "../../apiStore";

function EventCard({ event }) {
    const { events, fetchEvents } = useApiStore();
    const { addOrder, orders } = useOrderContext();

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);


    const handleAddToCart = () => {
        // Ensure that event is a valid event object
        if (typeof event.preventDefault === 'function') {
            event.preventDefault();
            
            // Log information about the click event
            console.log('Button clicked:', event.target);
            
            // Log any data attributes associated with the button
            console.log('Data attributes:', event.target.dataset);
            
            // Extract event details from the event object
            const eventId = event.eventId;
            const name = event.name;
            const where = event.where;
            const date = event.when ? event.when.date : 'Inget datum tillgängligt';
            const from = event.when ? event.when.from : 'Inget datum tillgängligt';
            const to = event.when ? event.when.to : 'Inget datum tillgängligt';
            const price = event.price || 0;
    
            // Calculate total price and create the order object
            const newTicketCount = orders.filter(order => order.eventId === eventId).length + 1;
            const totalPrice = newTicketCount * price;
            const order = {
                id: `${eventId}-${new Date().getTime()}`,
                eventId: eventId,
                name: name,
                where: where,
                date: date,
                from: from,
                to: to,
                price: price,
                ticketCount: newTicketCount,
                totalPrice: totalPrice
            };
    
            // Add the order to the context
            addOrder(order);
        } else {
            console.error('Invalid event object:', event);
        }
    };
    
    if (!event) {
        return <p>Ingen eventdata tillgänglig</p>;
    }

    return (
        <div className="event-card">
            <section className='details__container'>
                <h1>{event.name}</h1>
                <p className='single-event__when'>
                    {event.when ? `${event.when.date} ${event.when.from} - ${event.when.to}` : 'Inget datum tillgängligt'}
                </p>
                <p className='single-event__where'>
                    @ {event.where || 'Ingen plats angiven'}
                </p>
            </section>

            <section className='tickets__container'>
                <EventCalc event={event} />
            </section>

            <section className="btn__container">
                <button className='btn__styling' onClick={() => handleAddToCart(event)}>Lägg i varukorgen</button>
            </section>
        </div>
    );
}

export default EventCard;*/

/*import { useOrderContext } from '../../OrderContextProvider';
import { useEffect } from 'react';
import EventCalc from '../eventCalc/EventCalc';
import './eventCard.css';
import useApiStore from "../../apiStore";

function EventCard({ event }) {
    console.log('event', event);
    const { events, fetchEvents } = useApiStore();
    const { addOrder, orders } = useOrderContext();

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const handleAddToCart = (event) => {
        console.log("Received event:", event);
        if (event && typeof event.preventDefault === 'function') {
            event.preventDefault();
            console.log('Button clicked:', event.target);
            console.log('Data attributes on btn click:', event.target.dataset);

            const existingOrderIndex = orders.findIndex(order => order.eventId === event.eventId);
            const newTicketCount = (existingOrderIndex !== -1) ? orders[existingOrderIndex].ticketCount + 1 : 1;
            const totalPrice = newTicketCount * event.price;

            console.log("Event:", event);
            const order = {
                id: `${event.eventId}-${new Date().getTime()}`,
                eventId: event.eventId,
                name: event.name,
                where: event.where,
                date: event.when.date || 'Inget datum tillgängligt',
                from: event.when.from || 'Inget datum tillgängligt',
                to: event.when.to || 'Inget datum tillgängligt',
                price: event.price || 0,
                ticketCount: newTicketCount,
                totalPrice: totalPrice
            };
            console.log("Order to add:", order);
            
            addOrder(order);
        }
    };

    if (!event) {
        return <p>Ingen eventdata tillgänglig</p>;
    }

    return (
        <div className="event-card">
            <section className='details__container'>
                <h1>{event.name}</h1>
                <p className='single-event__when'>
                    {event.when ? `${event.when.date} ${event.when.from} - ${event.when.to}` : 'Inget datum tillgängligt'}
                </p>
                <p className='single-event__where'>
                    @ {event.where || 'Ingen plats angiven'}
                </p>
            </section>

            <section className='tickets__container'>
                <EventCalc event={event} />
            </section>

            <section className="btn__container">
            <button className='btn__styling' onClick={() => handleAddToCart(event)}>Lägg i varukorgen</button>
            </section>
        </div>
    );
}

export default EventCard;*/