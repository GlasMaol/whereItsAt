import { Routes, Route } from "react-router-dom";
import { OrderContextProvider } from "./OrderContextProvider";
import HomePage from './pages/homepage/HomePage';
import OrderPage from './pages/orderpage/OrderPage';
import EventsPage from './pages/eventspage/EventsPage';
import NavBar from './components/navbar/NavBar';
import EventPage from "./pages/eventPage/EventPage";
import TicketsPage from './pages/ticketspage/TicketsPage';


function App() {

  return (
    <OrderContextProvider>
      <div className="content__container">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/events' element={<EventsPage />} />
          <Route path='/event' element={<EventPage />} />
          <Route path='/orders' element={<OrderPage />} />
          <Route path='/tickets' element={<TicketsPage />} />
        </Routes>

        <NavBar />
      </div>
    </OrderContextProvider>
  )
}

export default App
