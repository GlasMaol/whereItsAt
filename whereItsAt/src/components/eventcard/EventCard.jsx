import useApiStore from '../../apiStore';
import { useEffect } from 'react';

function EventCard() {
    const { events, fetchEvents } = useApiStore();

    useEffect(() => {
        fetchEvents();
    }, [])

    return (
        <div>
            <section>
                {events.map((event, index) => (
                    <div key={index}>
                        <h1>{event.name}</h1>
                        <p>
                        {event.when.date} {event.when.from} - {event.when.to}
                        </p>
                        <p>@ {event.where}</p>
                    </div>
                ))}
                <section></section>
                <button className='btn__styling'>Lägg i varukorgen</button>
            </section>
        </div>
    );
}

export default EventCard
