import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApiStore from "../../apiStore";
import EventCard from "../../components/eventcard/EventCard";
import './eventPage.css'

function EventPage() {
    const { eventId } = useParams();
    const { events, fetchEvents } = useApiStore();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    useEffect(() => {
        const numEventId = Number(eventId);
        const foundEvent = events.find(event => event.id === numEventId);
        setEvent(foundEvent);
    }, [eventId, events]);

    /*console.log("Event skickat till EventCard:", event);*/

    return (
        <div className="content__container">
            <h2>Event</h2>
            <p className='event__text'>
                You are about to score<br></br>some tickets to
            </p>
            {event ? <EventCard event={event} /> : <p>Event details not found.</p>}
        </div>
    );
}

export default EventPage;


/*import './eventPage.css'
import EventCard from '../../components/eventcard/EventCard'
import { useLocation } from 'react-router-dom';

function EventPage() {
    const location = useLocation();
    const { event } = location.state || {};

    return (
        <div className="content__container">
            <h1>
                Event
            </h1>
            <p className='event__text'>
                You are about to score<br></br>some tickets to
            </p>
            {event ? <EventCard event={event} /> : <p>Event detaljer hittades inte</p>}
        </div>
    )
}

export default EventPage*/
