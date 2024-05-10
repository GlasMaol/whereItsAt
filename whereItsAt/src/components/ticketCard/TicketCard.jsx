
import { useEffect } from "react";
import './ticketCard.css';

function TicketCard({ ticket }) {

    if (!ticket) {
        return null;
    }

    const { eventName, eventLocation, eventDate, eventFrom, eventTo } = ticket;

    return (
        <div className="tickets__container">
            <section className="ticket__frame">
                <section className="what__section">
                    <p>WHAT</p>
                    <h2>
                        {eventName}
                    </h2>
                </section>
                <section className="where__section">
                    <p>WHERE</p>
                    <span>
                        <p>
                            {eventLocation}</p>
                    </span>
                </section>
                <section className="when__section">
                    <span>
                        <p>
                            WHEN
                        </p>
                        <p>
                            {eventDate}
                            </p>
                    </span>
                    <span>
                        <p>
                            FROM
                        </p>
                        <p>{eventFrom}</p>
                    </span>
                    <span>
                        <p>
                            TO
                        </p>
                        <p>{eventTo}</p>
                    </span>
                </section>
                <section className="info__section">
                    <p>
                        INFO
                    </p>
                    <span>
                        <p>importera seatinmg section här</p>
                    </span>
                    <span>
                        <p>importera seat här</p>
                    </span>
                </section>
                <section className="id__section">
                    <article><p>put seating generator here</p></article>
                    <article><p>put random ticket ID here</p></article>
                </section>
            </section>
        </div>
    )
}

export default TicketCard
