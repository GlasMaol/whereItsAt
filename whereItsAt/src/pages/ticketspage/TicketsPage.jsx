

import { useOrderContext } from "../../OrderContextProvider";
import { useState, useEffect } from "react";
import TicketCard from "../../components/ticketCard/TicketCard"
import './ticketsPage.css';


const TicketsPage = () => {
    const { orders } = useOrderContext();
    
    useEffect(() => {
        console.log(" orders in TicketsPage:", orders);
    }, [orders]);

 useEffect(() => {
        console.log('my ordered tickets eller...',orders);
    }, [orders]);

    if (orders.length === 0) {
        return <p>Inga biljetter tillgängliga.</p>;
    }


    return (
        <div>
            {orders.length > 0 ? (
                orders.map(order => (
                    <TicketCard
                    key={order.id}
                    ticket={order}
                    />
                ))
            ) : (
                <p className="fault">
                    Inga biljetter tillgängliga
                </p>
            )}
        </div>
    )
}

export default TicketsPage
