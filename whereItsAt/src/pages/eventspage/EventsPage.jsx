import React from 'react'
import './eventsPage.css'

function EventsPage() {
    return (
        <div className="content__container">
            <section>
                <h2>
                    Events
                </h2>
                <input className='events__input' type="text" />
            </section>
            <section>
                <h3>events here</h3>
            </section>
        </div>
    )
}

export default EventsPage
