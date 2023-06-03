import React from 'react';
import {useNavigate} from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();
    const goBack = () => navigate('/login');
  return (
    <section>
        <h1>Unauthorized</h1>
        <br/>
        <p> You don't have access to this page for now.</p>
        <div>
            <button onClick={goBack}>Go Sign In</button>
        </div>
    </section>
  )
}

export default Unauthorized