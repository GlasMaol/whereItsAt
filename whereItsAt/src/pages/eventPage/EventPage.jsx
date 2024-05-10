

import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import useApiStore from "../../apiStore";
import EventCard from "../../components/eventcard/EventCard";
import './eventPage.css'


function EventPage() {
    const { eventId } = useParams();
    const location = useLocation();
    const { events, fetchEvents } = useApiStore();
    const [event, setEvent] = useState(null);


    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);


    useEffect(() => {
        /*console.log("Location state:", location.state);*/
        const foundEvent = events.find(event => event.id === eventId);
        setEvent(foundEvent);
    }, [eventId, events, location.state]);

const addEventTicket = () => {
setEvent(prevEvent => [...prevEvent, prevEvent.ticketCount = prevEvent.ticketCount + 1]);
}

    return (
        <div className="content__container">
            <h2>Event</h2>
            <p className='event__text'>
                You are about to score<br></br>some tickets to
            </p>
            {event ? <EventCard event={event} addEventTicket={addEventTicket} /> : <p className="fault-message">Event details not found.</p>}

        </div>
    );
}

export default EventPage;