import './eventPage.css'
import EventCard from '../../components/eventcard/EventCard'

function EventPage() {
    return (
        <div className="content__container">
            <h1>
                Event
            </h1>
            <p className='event__text'>
                You are about to score<br></br>some tickets to
            </p>


            <EventCard />

        </div>
    )
}

export default EventPage
