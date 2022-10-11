import React, { useState } from 'react'

export default function Joke({ title, text }) {
    const [timer, setTimer] = useState(false)
    setTimeout(() => {
        setTimer(true)
    }, 300)
    return <div className="theJoke">
        { timer ? <div><h2>{title}</h2><p>{text}</p></div> : "Loading..." }
    </div>
}