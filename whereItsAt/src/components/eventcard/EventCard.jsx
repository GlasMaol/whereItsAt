import { useOrderContext } from '../../OrderContextProvider';
import EventCalc from '../eventCalc/EventCalc';
import './eventCard.css';

function EventCard({ event, addEventTicket }) {
    const { addOrder, orders } = useOrderContext();

    const handleAddToCart = () => {
        if (event) {
            const existingOrderIndex = orders.findIndex(order => order.id === event.eventId);
            const newTicketCount = (existingOrderIndex !== -1) ? orders[existingOrderIndex].ticketCount + 1 : 1;
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