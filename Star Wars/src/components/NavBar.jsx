import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import Brightness2Icon from '@mui/icons-material/Brightness2';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import SegmentIcon from '@mui/icons-material/Segment';
import CloseIcon from '@mui/icons-material/Close';

function Navbar() {
    const [theme, setTheme] = useState('light')
    const [open, setOpen] = useState(false)
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
        document.body.classList.toggle('dark')
    }
    const toogleMenu = (e) => {
        const menu = document.querySelector('#menu-list')
        menu.classList.toggle('hidden')
        setOpen(!open)
    }
    return (
        <>
            <div className='lg:flex   flex-row justify-between  lg:items-center lg:justify-between p-5  shadow-black shadow-sm bg-white dark:bg-gray-800 bg-opacity-90  dark:shadow-slate-50  sticky top-0  dark:bg-bg-dark dark:text-white z-50'>
                <div className="flex flex-row justify-between">
                    <div className='inline '>
                        <Link to={`/`} className='text-2xl font-bold text-black dark:text-white'>Star Wars ⚠️</Link>
                    </div>
                    <div className="">
                        <span className=' lg:hidden text-3xl'>
                            {open ? <CloseIcon onClick={toogleMenu} className='cursor-pointer menu-options' /> : <SegmentIcon onClick={toogleMenu} className='cursor-pointer menu-options text-6xl' />}
                        </span>
                    </div>
                </div>
                <div className="links dark:bg-bg-dark  lg:flex flex-row hidden" id="menu-list">
                    <ul className='lg:flex lg:flex-row lg:justify-end lg:opacity-100 opacity-100 text-center flex-col   p-10 gap-6 sm:flex   lg:py-0  lg:pl-0 '>
                        <li><a href="#" ><Link to={'/'} className="nav-list   hover:font-semibold " >Films</Link></a></li>
                        <li><a href="#" ><Link to={'/people'} className="nav-list   hover:font-semibold ">People</Link></a></li>
                        <li><a href="#" ><Link to={'/planets'} className="nav-list  hover:font-semibold   ">Planets</Link></a></li>
                        <li><a href="#" ><Link to={'/species'} className="nav-list   hover:font-semibold " >Species</Link></a></li>
                        <li><a href="#" ><Link to={'/vehicles'} className="nav-list  hover:font-semibold " >Vehicles</Link></a></li>
                        <li><a href="#" ><Link to={'/developer'} className="nav-list   hover:font-semibold " >Developer</Link></a></li>
                        {/* Light Switch  */}
                        <label className="switch " >
                            <input type="checkbox" />
                            <span className="slider round shadow-md shadow-slate-600 dark:border-cyan-300 border-opacity-100 rounded border-2" onClick={toggleTheme}></span>
                        </label>
                        <span className='pl-2'>{theme === 'light' ? <Brightness5Icon /> : <Brightness2Icon />}</span>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar