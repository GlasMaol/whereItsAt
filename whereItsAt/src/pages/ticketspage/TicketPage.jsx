/*import { useEffect } from 'react';*/
import { useOrderContext } from '../../OrderContextProvider';
import TicketCard from '../../components/ticketCard/TicketCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './ticketPage.css'


const TicketPage = () => {
    const { orders, clearOrders } = useOrderContext();

    //Stör skapandet av biljetter och är därför kommenterat bort.
    /*useEffect(() => {
        return () => {
            clearOrders();
        };
    }, []);*/


    return (
        <div className="ticket-page">
            <Swiper
                className="swiper-container"
                slidesPerView={1}
                spaceBetween={30}
            >
                {orders.map(order => (
                    <SwiperSlide key={order.id}>
                        <TicketCard order={order} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TicketPage;




/*import { useEffect, useState } from 'react';
import { useOrderContext } from '../../OrderContextProvider';
import TicketCard from '../../components/ticketCard/TicketCard';
import './ticketPage.css'
import { useSwipeable } from 'react-swipeable';

const TicketPage = () => {
    från react-swipeable const [currentIndex, setCurrentIndex] = useState(0);
    const { orders, clearOrders } = useOrderContext();
    console.log('orders in ticketPage', orders);


    //react-swipeable func till handlers
    const handlers = useSwipeable({
        onSwipedLeft: () => console.log('swiped left'),
        onSwipedRight: () => console.log('swiped right'),
        onSwipedUp: () => {
            const nextIndex = currentIndex + 1 < orders.length ? currentIndex + 1 : 0;
            setCurrentIndex(nextIndex);
            console.log('visar nästa biljett');
        },
        onSwipedDown: () => {
            const prevIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : orders.length - 1;
            setCurrentIndex(prevIndex);
            console.log('visar föregående biljett');
        },
        delta: 10,
        preventDefaultTouchmoneEvent: true,
        trackTouch: true,
        trackMouse: true
    });

    /*useEffect(() => {
        return () => {
            clearOrders();
            console.log('Orders cleared on component unmount');
        };
    }, []);*/

/* return (
     <div className="ticket-page">
         <div className="ticket-list" från react_swipeable {...handlers}>
             {orders.map(order => (
                 <TicketCard key={order.id} order={order} />
             ))}
         </div>

     </div>
 );
};

export default TicketPage;*/





/*import { useOrderContext } from "../../OrderContextProvider";
import { useState, useEffect } from "react";
import TicketCard from "../../components/ticketCard/TicketCard"
import './ticketsPage.css';


const TicketsPage = () => {
    const { orders } = useOrderContext();
    
    useEffect(() => {
        console.log(" orders in TicketsPage:", orders);
    }, [orders]);

 useEffect(() => {
        console.log('my ordered tickets eller...',orders);
    }, [orders]);

    if (orders.length === 0) {
        return <p>Inga biljetter tillgängliga.</p>;
    }


    return (
        <div>
            {orders.length > 0 ? (
                orders.map(order => (
                    <TicketCard
                    key={order.id}
                    ticket={order}
                    />
                ))
            ) : (
                <p className="fault">
                    Inga biljetter tillgängliga
                </p>
            )}
        </div>
    )
}

export default TicketsPage*/
