import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { fetchDentists } from '../../services/dentistService'
import { Link } from 'react-router-dom'

const Dentists = () => {
    const [dentists, setDentists] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const loadDentists = async () => {
            try {
                const data = await fetchDentists()
                setDentists(data)
            } catch (error) {
                console.error('Error loading dentists', error)
            }
        }
        loadDentists()
    }, [])

    const filteredDentists = dentists.filter((dentist) => {
        const fullName = `${dentist.name} ${dentist.lastname}`.toLowerCase()
        return (
            dentist.license.includes(searchTerm) ||
            fullName.includes(searchTerm.toLowerCase())
        )
    })

    return (
        <div className="flex">
            <Sidebar />
            <div className="p-6 flex-1">
                <div className='mb-4'>
                    <input 
                        type="text"
                        placeholder='Buscar odontólogo' 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-4 py-2 w-full'
                    />                    
                </div>

                <table className="min-w-full overflow-hidden rounded-lg shadow-lg">
                    <thead className='bg-blue-700 text-white'>
                        <tr>
                            <th className="border border-gray-200 px-4 py-2 font-medium">Matricula</th>
                            <th className="border border-gray-200 px-4 py-2 font-medium">Nombres </th>
                            <th className="border border-gray-200 px-4 py-2 font-medium">Apellidos</th>
                            <th className="border border-gray-200 px-4 py-2 font-medium">Jornada</th>
                            <th className="border border-gray-200 px-4 py-2 font-medium">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDentists.map((dentist) => (
                            <tr key={dentist.license} className='hover:bg-blue-100 transition-colors duration-300'>
                                <td className="border border-gray-200 px-4 py-2">{dentist.license}</td>
                                <td className="border border-gray-200 px-4 py-2">{dentist.name}</td>
                                <td className="border border-gray-200 px-4 py-2">{dentist.lastname}</td>
                                <td className="border border-gray-200 px-4 py-2">
                                    {dentist.startTime} - {dentist.endTime}
                                </td>
                                <td className="border border-gray-200 px-4 py-2 justify-center text-center">
                                    {dentist.active ?
                                        <span className='items-center justify-center px-3 py-1 text-xs font-semibold rounded-full bg-green-100 border border-green-300 text-green-700'>
                                            Activo
                                        </span>
                                        :
                                        <span className='items-center justify-center px-3 py-1 text-xs font-semibold rounded-full bg-red-100 border border-red-300 text-red-700'>
                                            Inactivo
                                            {dentist.absenceDays && (
                                                <span className='ml-1 text-xs text-red-700'>
                                                    ({dentist.absenceDays})
                                                </span>
                                            )}
                                        </span>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dentists
