
import { useEffect } from "react";
import './ticketCard.css';

function TicketCard({ order }) {

    if (!order) {
        return null;
    }

    const { name, where, date, from, to } = order;

    return (
        <div className="tickets__container">
            <section className="ticket__frame">
                <section className="what__section">
                    <p>WHAT</p>
                    <h2>{name}</h2>
                </section>
                <section className="where__section">
                    <p>WHERE</p>
                    <span>
                        <p>{where}</p>
                    </span>
                </section>
                <section className="when__section">
                    <span>
                        <p>WHEN</p>
                        <p>{date}</p>
                    </span>
                    <span>
                        <p>FROM</p>
                        <p>{from}</p>
                    </span>
                    <span>
                        <p>TO</p>
                        <p>{to}</p>
                    </span>
                </section>
                <section className="info__section">
                    <p>INFO</p>
                    <span>
                        <p>import seating section here</p>
                    </span>
                    <span>
                        <p>import seat here</p>
                    </span>
                </section>
                <section className="id__section">
                    <article><p>barcode</p></article>
                    <article><p>put random ticket ID here</p></article>
                </section>
            </section>
        </div>
    )
}

export default TicketCard
