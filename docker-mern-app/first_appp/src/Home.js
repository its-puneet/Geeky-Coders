import React from 'react'
import { useLocation } from 'react-router-dom';

function Home() {
    const location = useLocation()
    const yes = location.state;
    console.log(yes);
    return (
        <div>Home</div>
    )
}

export default Home