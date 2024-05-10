import { useState, useEffect } from 'react';
import { useOrderContext } from '../../OrderContextProvider';
import OrderCard from '../../components/orderCard/OrderCard';
import './orderPage.css';
import { useNavigate } from 'react-router-dom';

function OrderPage({ order }) {
    const navigate = useNavigate();

    const { orders, totalPrice, confirmOrder, generateTicketsForOrders } = useOrderContext();
    const [isOrdering, setIsOrdering] = useState(false);

    useEffect(() => {
        // Check if there are any active orders
        setIsOrdering(orders.length > 0);
    }, [orders]);

    const handlePlaceOrder = async () => {
        
        await confirmOrder();
        navigate('/tickets');
    };

    return (
        <div className="content__container ">
            <h2>Order</h2>
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
                    {isOrdering && (
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


/*import { useState, useEffect } from 'react';
import { useOrderContext } from '../../OrderContextProvider';
import OrderCard from '../../components/orderCard/OrderCard';
import './orderPage.css';
import TicketsPage from '../ticketspage/TicketPage';
import { useNavigate } from 'react-router-dom';

function OrderPage({ event }) {
    const navigate = useNavigate();

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


    const handlePlaceOrder = () => {
        // Call the confirmOrder function from the context
        confirmOrder();
        navigate('/tickets');
        // Navigate the user to the TicketsPage (you'll need to implement the navigation logic here)
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
            console.log("Data Passed to generateTicketsForOrders:", orders);
            const generatedTickets = generateTicketsForOrders(orders);
            setTickets(generatedTickets);
            console.log('generated tickets here', generatedTickets);
        }
    }, [orders]);

    return (
        <div className="content__container ">
            <h2>Order</h2>
            {showTickets && tickets.length > 0 && (
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

export default OrderPage;*/