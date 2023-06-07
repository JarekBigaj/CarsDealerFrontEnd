import Home from './Home';
import './App.css';
import Login from "./Login";
import Register from './Register';
import { Routes,Route } from 'react-router-dom';
import Layout from './Layout';
import UserSettings from './UserSettings';
import Offer from './Offer';
import Transaction from './Transaction';
import CarInfo from './Car/CarInfo';
import RequireAuth from './RequireAuth';
import MakeAnOffer from './Offer/MakeAnOffer';
import Unauthorized from './Unauthorized';
import FinallyTransaction from './Transaction/FinallyTransaction';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        {/* public routes */}
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/car' element={<CarInfo/>}/>
        <Route path='unauthorized' element={<Unauthorized/>}/>

        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={"User"}/>}>
          <Route path='UserSettings' element={<UserSettings/>}/>
          <Route path='Offer' element={<Offer/>}/>
          <Route path='Transaction' element={<Transaction/>}  />
          <Route path='makeanoffer' element = {<MakeAnOffer/>}/>
          <Route path='finallytransaction' element = {<FinallyTransaction/>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
