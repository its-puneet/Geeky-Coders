import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navbar from './components/Navbar'


import CatFighting from './assets/cats--fighting.webp'
import CatOnHold from './assets/catswithlightsaver.gif'
import Collector from './assets/the-collector-guardians-of-the-galaxy.gif'

import People from './assets/people-in-starwar.jpg'
import Starships from './assets/starship-in-starwar.jpg'
import Species from './assets/species-in-starwar.jpg'




function App() {

  return (
    <>
      <div className='bg-gray-800 py-36'>
        <div className='container mx-auto px-10 h-96 flex justify-between flex-row'>
          <div className='p-10'>
            <h1 className='text-white text-5xl'>Star Wars ☄️</h1>
            <br />
            <p className='text-clip text-white text-lg'>The Star Wars API is the world's first quantified and programmatically-formatted set of Star Wars data.
              After hours of watching films and trawling through content online, we present to you all the People, Films, Species, Starships, Vehicles and Planets from Star Wars.
              We've formatted this data in JSON and exposed it to you in a RESTish implementation that allows you to programmatically collect and measure the data.
              Check out the documentation to get started consuming swapi data.</p>

            <div className='pt-10'>
              <a href='https://swapi.dev/documentation' className='bg-blue-500 p-2 text-white rounded-lg shadow-blue-400 shadow-md'>Docs</a>
            </div>

          </div>
          <div className='h-full w-full '>
            <img src={CatOnHold} alt="catfighting" className='catonhold' />

          </div>

        </div>

        {/* // features section */}

        <div className=' h-[1080px] relative '>
          <div id="feature--section" className='h-96 '></div>
          <div className='absolute top-0 right-1/1 px-20'>
            <h1 className='text-center text-5xl text-white pt-10'>Collector</h1>
            <p className='text-center text-xl text-white '>we have a large collection of data 🚀</p>
            <div className='rounded-xl justify-center flex'>
              <img src={Collector} alt="" className='rounded-xl shadow-lg shadow-slate-400 h-80' />
            </div>



            <div className='flex flex-row p-5 justify-center gap-8 pt-20'>

              <div className='bg-red-400   rounded-xl relative'>
                <img src={People} alt="" className='rounded-xl shadow-lg shadow-slate-400 h-full' />
                <div className='absolute bottom-0 left-0 bg-black bg-opacity-50 rounded-xl p-2  hover:visible'>
                  <h1 className='text-white text-2xl'>People</h1>
                  <p className='text-white text-lg'>The People resource is a list of all the people who have been in the Star Wars films.</p>
                </div>
              </div>

              <div className='bg-red-400   rounded-xl relative'>
                <img src={Starships} alt="" className='rounded-xl shadow-lg shadow-slate-400 h-full' />
                <div className='absolute bottom-0 left-0 bg-black bg-opacity-50 rounded-xl p-2'>
                  <h1 className='text-white text-2xl'>Starships</h1>
                  <p className='text-white text-lg'>The Starships resource is a list of all the Starships who have been in the Star Wars films.</p>
                </div>
              </div>

              <div className='bg-red-400   rounded-xl relative '>
                <img src={Species} alt="" className='rounded-xl shadow-lg shadow-slate-400 ' />
                <div className='absolute bottom-0 left-0 bg-black bg-opacity-50 rounded-xl p-2'>
                  <h1 className='text-white text-2xl'>Species</h1>
                  <p className='text-white text-lg'>
                    The Species resource is a list of all the Species who have been in the Star Wars films.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* // features section */}

        <div>
          <div id="about--section" className='h-96 '>
            <h1 className='text-center text-5xl text-white pt-10'>About</h1>
            <p className='text-center text-xl text-white '>Cats Love Rage 😭</p>
            <div className='rounded-xl justify-center flex'>
              <img src={CatFighting} alt="catfighting" className='rounded-xl shadow-lg shadow-slate-400 h-80' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
