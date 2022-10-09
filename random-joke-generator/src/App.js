import React, { useState, useEffect } from "react"
import Joke from "./Joke"
import jokes from "./jokes.json"
import "./style.scss"

export default function App() {
    const [randomJoke, setRandomJoke] = useState(null)
    const [currentMap, setMap] = useState([])
    const generateJoke = () => {
        setRandomJoke(Math.floor((Math.random() * jokes.length) + 1))
    }
    useEffect(() => {
        console.log(`The number of the joke generated is ${randomJoke}!`)
        setMap(jokes.map((item, key) => {
            return <div key={key}>
                { randomJoke === item.id ? <Joke title={item.title} text={item.text} /> : "" }
            </div>
        }))
    }, [randomJoke])
    return (
        <div className="App">
            <h1>Random Joke Generator</h1>
            <button type="button" onClick={() => generateJoke()}>Generate Joke</button>
            <h3>Joke here:</h3>
            <div>
                {
                    currentMap
                }
            </div>
        </div>
    )
}