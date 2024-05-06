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
        const existingOrderIndex = orders.findIndex(o => o.id === order.id);
        if (existingOrderIndex !== -1) {
            const updatedOrders = [...orders];
            updatedOrders[existingOrderIndex] = order;
            setOrders(updatedOrders);
        } else {
            const updatedOrder = {
                ...order,
                ticketCount: ticketCounts[order.id] || 0,
                totalPrice: eventPrices[order.id] || 0
            };
            setOrders([...orders, updatedOrder]);
        }
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
        const newEventPrice = (eventPrices[eventId] || 0) + number * pricePerTicket;
        const newTotalPrice = totalPrice + number * pricePerTicket;
    
        setTicketCounts(prevTicketCounts => ({ ...prevTicketCounts, [eventId]: newCount }));
        setEventPrices(prevEventPrices => ({ ...prevEventPrices, [eventId]: newEventPrice }));
        setTotalPrice(newTotalPrice);
    };
    /*const addTickets = (eventId, number, pricePerTicket) => {
        const newCount = (ticketCounts[eventId] || 0) + number;
        const newEventPrice = (eventPrices[eventId] || 0) + (number * pricePerTicket);
        const newTotalPrice = totalPrice + (number * pricePerTicket);

        setTicketCounts(prev => ({ ...prev, [eventId]: newCount }));
        setEventPrices(prev => ({ ...prev, [eventId]: newEventPrice }));
        setTotalPrice(newTotalPrice);
    };*/

    const removeTickets = (eventId, number, pricePerTicket) => {
        const currentCount = ticketCounts[eventId] || 0;
        const newCount = Math.max(currentCount - number, 0);
        const priceReduction = number * pricePerTicket;
    
        setTicketCounts(prevTicketCounts => ({ ...prevTicketCounts, [eventId]: newCount }));
        setEventPrices(prevEventPrices => ({ ...prevEventPrices, [eventId]: Math.max((prevEventPrices[eventId] || 0) - priceReduction, 0) }));
        setTotalPrice(prevTotalPrice => Math.max(prevTotalPrice - priceReduction, 0));

        if (newCount === 0) {
            const updatedOrders = orders.filter(order => order.id !== eventId);
            setOrders(updatedOrders);
        }
    };
    /*const removeTickets = (eventId, number, pricePerTicket) => {
        if (!(eventId in ticketCounts)) {
            console.error(`Event with ID ${eventId} not found.`);
            return;
        }
    
        const currentCount = ticketCounts[eventId];
        const newCount = Math.max(currentCount - number, 0);
        setTicketCounts(prev => ({ ...prev, [eventId]: newCount }));
        const priceReduction = number * pricePerTicket;
        setEventPrices(prev => ({
            ...prev,
            [eventId]: Math.max(prev[eventId] - priceReduction, 0)
        }));
        const newTotalPrice = Math.max(totalPrice - priceReduction, 0);
        setTotalPrice(newTotalPrice);
        if (newCount === 0) {
            const updatedOrders = orders.filter(order => order.id !== eventId);
            setOrders(updatedOrders);
        }
    };*/
    /*const removeTickets = (eventId, number, pricePerTicket) => {
       
        if (!(eventId in ticketCounts) || !(eventId in eventPrices)) {
            console.error(`Event with ID ${eventId} not found in ticketCounts or eventPrices.`);
            return;
        }
    
        const currentCount = ticketCounts[eventId];
        if (currentCount === undefined) {
            console.error(`Ticket count for event with ID ${eventId} is undefined.`);
            return;
        }
    
        const newCount = Math.max(currentCount - number, 0);
    
        if (newCount === 0) {
            const updatedOrders = orders.filter(order => order.id !== eventId);
            setOrders(updatedOrders);
    
            const { [eventId]: _, ...newTicketCounts } = ticketCounts;
            const { [eventId]: __, ...newEventPrices } = eventPrices;
            setTicketCounts(newTicketCounts);
            setEventPrices(newEventPrices);
        } else {
            setTicketCounts(prev => ({ ...prev, [eventId]: newCount }));
    
            const priceReduction = number * pricePerTicket;
            setEventPrices(prev => ({ ...prev, [eventId]: Math.max((prev[eventId] || 0) - priceReduction, 0) }));
        }
    
        const newTotalPrice = Math.max(totalPrice - (number * pricePerTicket), 0);
        setTotalPrice(newTotalPrice);
    };*/
    /*const removeTickets = (eventId, number, pricePerTicket) => {
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
        const newTotalPrice = Math.max(totalPrice - (number * pricePerTicket), 0);
        setTotalPrice(newTotalPrice);
    };*/

    const confirmOrder = () => {
        setOrders([]);
        setTicketCounts({});
        setEventPrices({});
        setTotalPrice(0);
        console.log('Ordern är bekräftad');
    }

    const updateOrder = (orderId, ticketChange, isAdding) => {
        const order = orders.find(order => order.id === orderId);
        const currentTicketCount = order ? order.ticketCount : 0;
        const updatedTicketCount = isAdding ? currentTicketCount + ticketChange : Math.max(currentTicketCount - ticketChange, 0);
    
        const updatedOrders = orders.map(order => {
            if (order.id === orderId) {
                return { ...order, ticketCount: updatedTicketCount };
            }
            return order;
        });
        setOrders(updatedOrders);
    
        setTicketCounts(prevTicketCounts => ({
            ...prevTicketCounts,
            [orderId]: updatedTicketCount
        }));
    
        const newTotalPrice = updatedOrders.reduce((total, order) => {
            return total + (order.ticketCount * order.price);
        }, 0);
        setTotalPrice(newTotalPrice);
    };
    /*const updateOrder = (orderId, newTicketCount) => {
        const updatedOrders = orders.map(order => {
            if (order.id === orderId) {
                const newTotalPrice = newTicketCount * order.price;

                return { ...order, ticketCount: newTicketCount, totalPrice: newTotalPrice };
            }
            return order;
        });

        setOrders(updatedOrders);

        const newTotalPrice = updatedOrders.reduce((total, order) => total + order.totalPrice, 0);

        setTotalPrice(newTotalPrice);
    };*/

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