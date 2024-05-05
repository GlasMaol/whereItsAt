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
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetchEvents();
        loadLocalStorageData();
    }, []);

    const loadLocalStorageData = () => {
        const savedData = localStorage.getItem('orderData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setOrders(parsedData.orders);
            setTicketCounts(parsedData.ticketCounts);
            setEventPrices(parsedData.eventPrices);
            setTotalPrice(parsedData.totalPrice);
            setIsLoaded(true);
        }
    };

    useEffect(() => {
        if (isLoaded) {
            const data = {
                orders: orders,
                ticketCounts: ticketCounts,
                eventPrices: eventPrices,
                totalPrice: totalPrice
            };
            localStorage.setItem('orderData', JSON.stringify(data));
        }
    }, [orders, ticketCounts, eventPrices, totalPrice, events, isLoaded]);

    const addOrder = (order) => {
        setOrders([...orders, order]);
        setTicketCounts({});
        setEventPrices({});
        setTotalPrice(0);
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
        const newCount = Math.max(currentCount - number, 0);
        const priceReduction = number * pricePerTicket;
        const newEventPrice = Math.max((eventPrices[eventId] || 0) - priceReduction, 0);

        setTicketCounts(prev => ({ ...prev, [eventId]: newCount }));
        setEventPrices(prev => ({ ...prev, [eventId]: newEventPrice }));
        setTotalPrice(prev => Math.max(prev - priceReduction, 0));
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
    };

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
};

export { OrderContextProvider, useOrderContext, OrderContext };