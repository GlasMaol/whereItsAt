import './eventsPage.css'
import { useState, useEffect } from 'react'


function EventsPage() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('https://santosnr6.github.io/Data/events.json')
            .then(response => response.json())
            .then(data => setEvents(data.events))
            .catch(error => console.error('Fel när events hämtades:', error));
    }, []);

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
                    <div className="event__card">

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
                ))}
            </section>
        </div>
    )
}

export default EventsPage
