import { createContext, useContext, useEffect, useState } from 'react';
import useApiStore from './apiStore';

const OrderContext = createContext();

const useOrderContext = () => useContext(OrderContext);

const OrderContextProvider = ({ children }) => {
    const { events, fetchEvents } = useApiStore();
    const [orders, setOrders] = useState([]);
    const [ticketCounts, setTicketCounts] = useState({});
    const [eventPrices, setEventPrices] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);

    const addOrder = (order) => {

        const updatedOrder = {
            ...order,
            ticketCount: ticketCounts[order.id] || 0,
            totalPrice: eventPrices[order.id] || 0
        };

        setOrders([...orders, updatedOrder]);
    };

    const removeOrder = (orderId) => {
        const updatedOrders = orders.filter((order) => order.id !== orderId);
        setOrders(updatedOrders);
        setTicketCounts({});
        setEventPrices({});
        setTotalPrice(0);
    };

    const addTickets = (eventId, number, pricePerTicket) => {
        const newCount = (ticketCounts[eventId] || 0) + number;
        const newEventPrice = (eventPrices[eventId] || 0) + (number * pricePerTicket);

        setTicketCounts(prev => ({ ...prev, [eventId]: newCount }));
        setEventPrices(prev => ({ ...prev, [eventId]: newEventPrice }));
        setTotalPrice(prev => (prev + (number * pricePerTicket)));
    };

    const removeTickets = (eventId, number, pricePerTicket) => {
        const currentCount = ticketCounts[eventId] || 0;
        if (number < 0 || number > currentCount) {
            console.error("Ogiltigt antal biljetter angivet för borttagning.");
            return;
        }

        const newCount = currentCount - number;
        if (newCount === 0) {
            const updatedOrders = orders.filter(order => order.eventId !== eventId);
            setOrders(updatedOrders);
            const { [eventId]: _, ...newTicketCounts } = ticketCounts;
            const { [eventId]: __, ...newEventPrices } = eventPrices;
            setTicketCounts(newTicketCounts);
            setEventPrices(newEventPrices);
        } else {
            setTicketCounts(prev => ({ ...prev, [eventId]: newCount }));
            const priceReduction = number * pricePerTicket;
            setEventPrices(prev => ({ ...prev, [eventId]: (eventPrices[eventId] || 0) - priceReduction }));
        }
        setTotalPrice(prev => Math.max(prev - (number * pricePerTicket), 0));
    };

    const confirmOrder = () => {
        console.log('Ordern är bekräftad');
    }

    const updateOrder = (orderId, newTicketCount) => {
        const updatedOrders = orders.map(order => {
            if (order.id === orderId) {
                // Calculate the new total price based on the updated ticket count
                const newTotalPrice = newTicketCount * order.price;

                // Update the ticketCount and totalPrice of the matched order
                return { ...order, ticketCount: newTicketCount, totalPrice: newTotalPrice };
            }
            return order; // Return unchanged order if it doesn't match the orderId
        });

        // Update the orders state with the updatedOrders array
        setOrders(updatedOrders);

        // Calculate the total price by summing the totalPrice of all orders
        const newTotalPrice = updatedOrders.reduce((total, order) => total + order.totalPrice, 0);

        // Update the totalPrice state with the new total price
        setTotalPrice(newTotalPrice);
    };

    const value = {
        events,
        orders,
        addTickets,
        removeTickets,
        ticketCounts,
        eventPrices,
        totalPrice,
        addOrder,
        removeOrder,
        confirmOrder,
        updateOrder
    };

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
};

export { OrderContextProvider, useOrderContext, OrderContext };