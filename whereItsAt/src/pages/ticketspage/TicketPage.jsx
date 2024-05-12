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
