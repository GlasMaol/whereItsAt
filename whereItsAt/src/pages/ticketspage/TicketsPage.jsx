

import { useOrderContext } from "../../OrderContextProvider";
import { useState, useEffect } from "react";
import TicketCard from "../../components/ticketCard/TicketCard"
import './ticketsPage.css';


const TicketsPage = () => {
    const { tickets } = useOrderContext();
    
    useEffect(() => {
        console.log("Tickets:", tickets);
    }, [tickets]);

    if (tickets.length === 0) {
        return <p>Inga biljetter tillgängliga.</p>;
    }

    useEffect(() => {
        console.log('my tickets eller...',tickets);
    }, [tickets]);

    return (
        <div>
            {tickets.length > 0 ? (
                tickets.map(ticket => (
                    <TicketCard
                    key={ticket.ticketId}
                    ticket={ticket}
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
