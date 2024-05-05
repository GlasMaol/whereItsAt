
import './eventsPage.css'
import useApiStore from '../../apiStore';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


function EventsPage() {
    const { events, fetchEvents } = useApiStore();

    useEffect(() => {
        fetchEvents();
    }, [])

    return (
        <div className="content__container">
            <section>
                <h2>
                    Events
                </h2>
                <input className='events__input' type="text" />
            </section>

            <section className='events__cards-holder'>
                {events.map((event, index) => (
                    <Link
                        to={{
                            pathname: `/event/${event.id}`,
                            state: { event: event },
                        }}
                        role='link'
                        aria-label='link to event'
                        key={index}
                        >
                        <div className="event__card"
                            >

                            <article className='date__holder'>
                                <span className='date__number'>{event.when.date.split(' ')[0]}</span>
                                <span className='date__month'>{event.when.date.split(' ')[1].substring(0, 3)}</span>
                            </article>

                            <section className='info__holder'>
                                <article className='info-left__container'>
                                    <div className='event__titel' title={event.name}>
                                        {event.name}
                                    </div>
                                    <div className='event__where'>
                                        {event.where}
                                    </div>
                                    <div className='event__when'>
                                        {event.when.from} - {event.when.to}
                                    </div>
                                </article>

                                <article className='price__container'>
                                    <div className='event__price'>
                                        {event.price} sek
                                    </div>
                                </article>
                            </section>
                        </div>
                    </Link>
                ))}

                <Link to='/orders' role='link' aria-label='link to order page'>
                    <button className="btn__styling">
                        Till Varukorgen
                    </button>
                </Link>
            </section>
        </div>
    )
}

export default EventsPage


