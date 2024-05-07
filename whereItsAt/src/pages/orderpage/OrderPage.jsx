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