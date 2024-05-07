import { useOrderContext } from '../../OrderContextProvider';
import OrderCard from '../../components/orderCard/OrderCard';
import './orderPage.css';

function OrderPage() {
    const { orders, totalPrice, confirmOrder } = useOrderContext();

    const handlePlaceOrder = () => {
        confirmOrder();
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
                    <button className="btn__styling" onClick={handlePlaceOrder}>
                        Skicka order
                    </button>
                </section>
            </section>
        </div>
    )
}

export default OrderPage;

/*import { useOrderContext } from '../../OrderContextProvider';
import OrderCard from '../../components/orderCard/OrderCard'; // Assuming this is the correct path to your OrderCard component
import './orderPage.css';

function OrderPage() {
    const { orders, totalPrice, confirmOrder, updateOrder, removeOrder } = useOrderContext();

    const handlePlaceOrder = () => {
        confirmOrder();
    };

    return (
        <div className="content__container">
            <section>
                <h2>Order</h2>
                {orders.length > 0 ? (
                    orders.map(order => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            updateOrder={updateOrder}
                        />
                    ))
                ) : (
                    <p>Inga aktiva orders.</p>
                )}
            </section>
            <section>
                <span>
                    <p className='order__p-text'>Totalt värde på order</p>
                    <h3>{totalPrice} sek</h3>
                </span>
                <button className="btn__styling" onClick={handlePlaceOrder}>
                    Skicka order
                </button>
            </section>
        </div>
    )
}

export default OrderPage;*/

/*import { useOrderContext } from '../../OrderContextProvider';
import OrderCard from '../../components/orderCard/OrderCard';
import './orderPage.css';

function OrderPage() {
    const { orders, totalPrice, confirmOrder, updateOrder, removeOrder } = useOrderContext();

    const handlePlaceOrder = () => {
        confirmOrder();
    };

    const handleIncrease = (orderId) => {
        updateOrder(orderId, orders.find(order => order.id === orderId).ticketCount + 1);
    };

    const handleDecrease = (orderId) => {
        const currentCount = orders.find(order => order.id === orderId).ticketCount;
        if (currentCount > 1) {
            updateOrder(orderId, currentCount - 1);
        } else {
            removeOrder(orderId);
        }
    };

    return (
        <div className="content__container">
            <section>
                <h2>Order</h2>
                {orders.length > 0 ? (
                    orders.map(order => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            onIncrease={() => handleIncrease(order.id)}
                            onDecrease={() => handleDecrease(order.id)}
                        />
                    ))
                ) : (
                    <p>Inga aktiva orders.</p>
                )}
            </section>
            <section>
                <span>
                    <p className='order__p-text'>Totalt värde på order</p>
                    <h3>{totalPrice} sek</h3>
                </span>
                <button className="btn__styling" onClick={handlePlaceOrder}>
                    Skicka order
                </button>
            </section>
        </div>
    )
}

export default OrderPage;*/
