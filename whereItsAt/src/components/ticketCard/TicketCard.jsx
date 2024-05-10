import './ticketCard.css'
import { useOrderContext } from '../../OrderContextProvider';

const TicketCard = ({ order }) => {
const { tickets } = useOrderContext();

    const { name, where, date, from, to, id } = order;

    // Function to generate a random ticket ID
    const randomTicketId = (existingIds) => {
        const generateId = () => {
            let Id = '';
            for (let i = 0; i < 5; i++) {
                const randomChar = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
                Id += randomChar;
            }
            return Id;
        };

        let newId = generateId();
        while (existingIds.includes(newId)) {
            newId = generateId();
        }
        return newId;
    };

    // Function to generate seating information
    const generateSeating = (existingTickets, numTickets) => {
        const sections = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.replace(/[ÅÄÖ]/g, '');
        let section = sections[Math.floor(Math.random() * sections.length)];

        let maxSeatNum = existingTickets.reduce((max, ticket) => {
            return ticket.section === section ? Math.max(max, ticket.seat) : max;
        }, 0);

        let seats = [];
        for (let i = 1; i <= numTickets; i++) {
            seats.push({
                section: section,
                seat: maxSeatNum + i
            });
        }
        return seats;
    };

    // Generate a random ticket ID for this order
    const ticketId = randomTicketId(Object.keys(tickets));

    // Generate seating information for this order
    const seating = generateSeating(tickets, 1)[0]; // Assuming generating 1 ticket


    return (
        <div className="ticket-card">

            <section className="what__section">
                <p className='section__title'>WHAT</p>
                <h2>{name}</h2>
            </section>
            <section className="where__section">
                <p className='section__title'>WHERE</p>
                <span>
                    <p className='where__content'>{where}</p>
                </span>
            </section>
            <section className="when__section">
                <span className='when__section-inner'>
                    <p className='when__title'>WHEN</p>
                    <p className='when__content'>{date}</p>
                </span>
                <span className='when__section-inner'>
                    <p className='when__title'>FROM</p>
                    <p className='when__content'>{from}</p>
                </span>
                <span className='when__section-inner'>
                    <p className='when__title'>TO</p>
                    <p className='when__content'>{to}</p>
                </span>
            </section>
            <section className="info__section">
                <p className='section__title'>INFO</p>
                <span className='info__section-inner'>
                    <p className='seating__content'>Section {seating.section}</p>
                </span>
                <span className='info__section-inner'>
                    <p className='seating__content'>seat {seating.seat}</p>
                </span>
            </section>
            <section className="id__section">
                <article>
                    <p className='barcode'>{ticketId}</p>
                </article>
                <article>
                    <p className='ticket__id'>{ticketId}</p>
                </article>
            </section>

        </div>
    );
};

export default TicketCard;


/*import { useEffect } from "react";
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

export default TicketCard*/
