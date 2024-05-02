import { createContext, useContext, useEffect, useState } from 'react';
import useApiStore from './apiStore';

// Cskapa en context
const OrderContext = createContext();

// Custom hook för ordercontext
const useOrderContext = () => useContext(OrderContext);

// Provider component to wrap the application and provide order context
const OrderContextProvider = ({ children }) => {
    // Get the fetchEvents function from the useApiStore hook
    const { events, fetchEvents } = useApiStore();

    // Fetch events when the component mounts
    useEffect(() => {
        fetchEvents();
    }, []);

    // Initialize state for orders and total price
    const [orders, setOrders] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Add an order to the state and update total price
    const addOrder = (order) => {
        setOrders([...orders, order]);
        setTotalPrice(totalPrice + order.totalPrice);
    };

    // Remove an order from the state and update total price
    const removeOrder = (orderId) => {
        const updatedOrders = orders.filter((order) => order.id !== orderId);
        setOrders(updatedOrders);

        // Recalculate total price based on remaining orders
        const updatedTotalPrice = updatedOrders.reduce((total, order) => total + order.totalPrice, 0);
        setTotalPrice(updatedTotalPrice);
    };

    // Value object to provide in the context
    const value = {
        events,
        orders,
        totalPrice,
        selectedEvent,
        setSelectedEvent,
        addOrder,
        removeOrder,
    };

    // Render the provider with the value and children
    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
};

// Export the provider and hook for use in other components
export { OrderContextProvider, useOrderContext };