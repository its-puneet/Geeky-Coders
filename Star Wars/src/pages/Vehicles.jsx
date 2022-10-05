import React, { useEffect } from 'react'

function Vehicle() {

    const [Vehicles, setVehicle] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)
    const [page, setPage] = React.useState(1)

    useEffect(() => {

        fetch(`https://swapi.dev/api/vehicles/?page=${page}`)
            .then(res => res.json())
            .then(data => {
                setVehicle(data.results)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setError(true)

            })
    }, [page])

    return (
        <>
            <div className='dark:bg-gray-800'>
                <div className="container mx-auto">
                    <h1 className='text-center pt-10 dark:text-white text-7xl'>Vehicle</h1>
                    <p className='text-center py-8 dark:text-white'>A Vehicle resource is an individual Vehicle within the Star Wars universe.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {Vehicles.map((vehicle, index) => (
                            <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4 dark:shadow-slate-200 shadow-slate-700">
                                <h2 className="text-2xl font-bold dark:text-white" >{vehicle.name}</h2>
                                <p className='dark:text-white'>Model : {vehicle.model}</p>
                                <p className='dark:text-white'>Length : {vehicle.length} </p>
                                <p className='dark:text-white'>Manufactures : {vehicle.manufacturer} </p>
                                <p className='dark:text-white'>Crew : {vehicle.crew} </p>
                                <p className='dark:text-white'>Passengers : {vehicle.passengers} </p>
                                <p className='dark:text-white'>Vehicle Class : {vehicle.vehicle_class} </p>
                                <p className='dark:text-white'>In {vehicle.vehicle_class.length} Films</p>
                            </div>
                        ))}

                    </div>

                    <div className='flex justify-end p-5 gap-5 text-center items-center'>
                        <button onClick={() => setPage(page - 1)} className={` ${page === 1 ? 'bg-gray-700 hover:bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded-full`} disabled={page === 1}>Previous</button>
                        <button onClick={() => setPage(page + 1)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Next</button>
                        <p className='dark:text-white font-bold'>Page Number : {page}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Vehicle