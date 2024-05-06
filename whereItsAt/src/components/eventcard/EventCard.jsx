import { useContext } from 'react';
import { useOrderContext } from '../../OrderContextProvider';
import EventCalc from '../eventCalc/EventCalc';
import './eventCard.css'

function EventCard({ event }) {
    const { addOrder } = useOrderContext();

    const handleAddToCart = () => {
        const ticketCount = event.ticketCount || 0;
        const totalPrice = event.totalPrice || 0;
        const order = {
            id: event.id,
            name: event.name,
            date: event.when.date,
            from: event.when.from,
            to: event.when.to,
            price:event.price,
            ticketCount: ticketCount,
            totalPrice: totalPrice
        };
        addOrder(order);
        console.log('added order',order);
    }


    if (!event) {
        return <p>Ingen eventdata tillgänglig</p>;
    }

    /*console.log("Event object:", event);
    console.log('Event name:', event.name);
    console.log('Event when:', event.when);
    console.log('Event where:', event.where);
    console.log('Event price:', event.price);*/

    return (
        <div className="event-card">
            <section className='details__container'>
                <h1>
                    {event.name}
                </h1>
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
                <button className='btn__styling' onClick={handleAddToCart}>Lägg i varukorgen</button>
            </section>
        </div>
    );
}

export default EventCard

