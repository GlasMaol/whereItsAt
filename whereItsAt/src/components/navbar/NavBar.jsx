import React, { useState } from 'react';
import { GoHomeFill, GoHome } from 'react-icons/go';
import { IoCalendar, IoCalendarClearOutline, IoTicket, IoTicketOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom'
import './navBar.css';

function NavBar() {
    const [activePage, setActivePage] = useState(null);

    return (
        <div>
            <section className="navBar__container">
                {activePage === 'home' ? (
                    <>
                        <Link to='/' role='link' aria-label='link to homepage'>
                            <GoHomeFill
                                className="navBar__icon"
                                color='white'
                                size={35}
                                onMouseEnter={() => setActivePage('home')}
                                onMouseLeave={() => setActivePage(null)}
                            />
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to='/' role='link' aria-label='link to homepage'>
                            <GoHome
                                className="navBar__icon"
                                color='white'
                                size={35}
                                onMouseEnter={() => setActivePage('home')}
                                onMouseLeave={() => setActivePage(null)}
                            />
                        </Link>
                    </>
                )}

                {activePage === 'calendar' ? (
                    <>
                        <Link to='/events' role='link' aria-label='link to events'>
                            <IoCalendar
                                className="navBar__icon"
                                color='white'
                                size={35}
                                onMouseEnter={() => setActivePage('calendar')}
                                onMouseLeave={() => setActivePage(null)}
                            />
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to='/events' role='link' aria-label='link to events'>
                            <IoCalendarClearOutline
                                className="navBar__icon"
                                color='white'
                                size={35}
                                onMouseEnter={() => setActivePage('calendar')}
                                onMouseLeave={() => setActivePage(null)}
                            />
                        </Link>
                    </>
                )}

                {activePage === 'tickets' ? (
                    <>
                        <Link to='/orders' role='link' aria-label='link to orders'>
                            <IoTicket
                                className="navBar__icon"
                                color='white'
                                size={35}
                                onMouseEnter={() => setActivePage('tickets')}
                                onMouseLeave={() => setActivePage(null)}
                            />
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to='/orders' role='link' aria-label='link to orders'>
                        <IoTicketOutline
                            className="navBar__icon"
                            color='white'
                            size={35}
                            onMouseEnter={() => setActivePage('tickets')}
                            onMouseLeave={() => setActivePage(null)}
                        />
                    </Link>
            </>
                )}
        </section>
        </div >
    );

}

export default NavBar;
