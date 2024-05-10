
import { useState, useEffect } from 'react';
import { useOrderContext } from '../../OrderContextProvider';
import OrderCard from '../../components/orderCard/OrderCard';
import './orderPage.css';
import TicketsPage from '../ticketspage/TicketsPage';

function OrderPage({ event }) {
    const { orders, totalPrice, confirmOrder, generateTicketsForOrders, addTickets, removeTickets } = useOrderContext();
    const [tickets, setTickets] = useState([]);
    const [showTickets, setShowTickets] = useState(true);


    useEffect(() => {
        const hasOrders = orders.length >= 1;
        const ordersConfirmed = orders.every(order => order.confirmed);
        const ticketsGenerated = tickets.length >= 1;
        const shouldShowTickets = hasOrders && ordersConfirmed && ticketsGenerated;

        setShowTickets(shouldShowTickets);
        console.log('orders', orders);
    }, [orders, tickets])

    /*useEffect(() => {
        console.log('showTickets:', showTickets);
    }, [showTickets]);*/

    const handlePlaceOrder = () => {
        const validateOrder = (order) => {
            console.log('order to validate', order);
            const requiredFields = ['id', 'name', 'date', 'from', 'to', 'where', 'ticketCount'];
            const missingFields = requiredFields.filter(field => !order[field]);
            if (missingFields.length > 0) {
                console.error("Saknade fält i order:", missingFields.join(', '));
                return false;
            }
            return true;
        };

        if (orders.every(validateOrder)) {
            confirmOrder();
        } else {
            console.error("En eller flera orders är inte korrekt ifyllda.");
        }
        setShowTickets(true);
    };

    useEffect(() => {
        if (tickets.length >= 1) {
            setShowTickets(true);
        }
    }, [tickets]);

    useEffect(() => {
        console.log('aktuellaorders:', orders);
        const ids = orders.map(order => order.id);
        const uniqueIds = new Set(ids);
        if (ids.length !== uniqueIds.size) {
            console.error('Varning! Det finns dubbletter i order IDs');
        }
        if (orders.length > 0) {
            const generatedTickets = generateTicketsForOrders(orders);
            setTickets(generatedTickets);
            console.log('generated tickets here', generatedTickets);
        }
    }, [orders]);

    return (
        <div className="content__container ">
            <h2>Order</h2>
            {showTickets && event && tickets.length > 0 && (
                <TicketsPage tickets={tickets} />
            )}
            <section className='order__content'>
                <section>
                    {orders.length > 0 ? (
                        orders.map(order => (
                            <OrderCard
                                key={order.id}
                                order={order}
                            />
                        ))
                    ) : (
                        <p className='fault-message'>Inga aktiva orders.</p>
                    )}
                </section>
                <section>
                    <span>
                        <p className='order__text'>Totalt värde på order</p>
                        <p className='order__total'>{totalPrice} sek</p>
                    </span>

                    {orders.length > 0 && (
                        <button className="btn__styling" onClick={handlePlaceOrder}>
                            Skicka order
                        </button>
                    )}
                </section>
            </section>
        </div>
    )
}

export default OrderPage;