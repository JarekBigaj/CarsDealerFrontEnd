import Home from './Home';
import './App.css';
import Navbar from './Navbar';
import Login from "./Login";
import Register from './Register';
import { Routes,Route } from 'react-router-dom';
import Layout from './Layout';
import UserSettings from './UserSettings';
import Offer from './Offer';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        {/* public routes */}
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='/' element={<Home/>}/>

        {/* protected routes */}
        <Route path='UserSettings' element={<UserSettings/>}/>
        <Route path='Offer' element={<Offer/>}/>

      </Route>
    </Routes>
  );
}

export default App;
