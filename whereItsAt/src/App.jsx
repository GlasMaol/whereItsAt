import { Routes, Route } from "react-router-dom";
import HomePage from './pages/homepage/HomePage';
import OrderPage from './pages/orderpage/OrderPage';
import EventsPage from './pages/eventspage/EventsPage';
import NavBar from './components/navbar/NavBar';


function App() {

  return (
    <div className="content__container">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/events' element={<EventsPage />} />
        <Route path='/orders' element={<OrderPage />} />
      </Routes>
      
      <NavBar />
    </div>
  )
}

export default App
