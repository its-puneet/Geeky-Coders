import React, { useEffect } from 'react'

function Species() {

    const [species, setSpecies] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)
    const [page, setPage] = React.useState(1)

    useEffect(() => {

        fetch(`https://swapi.dev/api/species/?page=${page}`)
            .then(res => res.json())
            .then(data => {
                setSpecies(data.results)
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
                    <h1 className='text-center pt-10 dark:text-white text-7xl'>Species</h1>
                    <p className='text-center py-8 dark:text-white'>A Species resource is an individual person or character within the Star Wars universe.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {species.map((specie, index) => (
                            <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4 dark:shadow-slate-200 shadow-slate-700">
                                <h2 className="text-2xl font-bold dark:text-white" >{specie.name}</h2>
                                <p className='dark:text-white'>Classification : {specie.classification}</p>
                                <p className='dark:text-white'>Designation : {specie.designation} </p>
                                <p className='dark:text-white'>Average Height : {specie.average_height} </p>
                                <p className='dark:text-white'>Language : {specie.language} </p>
                                <p className='dark:text-white'>Skin Color : {specie.skin_colors} </p>
                            </div>
                        ))}

                    </div>

                    <div className='flex justify-end p-5 gap-5 text-center items-center'>
                        <button onClick={() => setPage(page - 1)} className={` ${page === 1 ? 'bg-gray-700 hover:bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded-full`} disabled={page === 1}>Previous</button>
                        <button onClick={() => setPage(page + 1)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Next</button>
                        <p className='dark:text-white font-bold'>Page Number : {page}</p>
                    </div>

                    <div>
                        <p>
                            {page}

                        </p>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Species