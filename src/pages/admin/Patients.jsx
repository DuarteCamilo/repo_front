import { useEffect, useState } from "react"
import { fetchPatients } from "../../services/patientService"
import Sidebar from "../../components/Sidebar/Sidebar"

const Patients = () => {
    const [patients, setPatients] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const loadPatients = async () => {
            try {
                const data = await fetchPatients();
                setPatients(data);
            } catch (error) {
                console.error('Error loading patients', error)
            }
        };

        loadPatients();

    }, [])

    const filteredPatients = patients.filter((patient) => {
        const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase()
        return (
            patient.dni.includes(searchTerm) ||
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
                        placeholder='Buscar pacientes'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-4 py-2 w-full'
                    />
                </div>

                <div className="overflow-hidden rounded-lg shadow-lg">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-blue-700 text-white">
                            <tr>
                                <th className="border border-gray-200 px-4 py-2 font-medium">DNI</th>
                                <th className="border border-gray-200 px-4 py-2 font-medium">Nombres</th>
                                <th className="border border-gray-200 px-4 py-2 font-medium">Apellidos</th>
                                <th className="border border-gray-200 px-4 py-2 font-medium">Ciudad Residencia</th>
                                <th className="border border-gray-200 px-4 py-2 font-medium">Correo Electrónico</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatients.map((patient) => (
                                <tr key={patient.dni} className="hover:bg-blue-100 transition-colors duration-300">
                                    <td className="border border-gray-200 px-4 py-2">{patient.dni}</td>
                                    <td className="border border-gray-200 px-4 py-2">{patient.firstName}</td>
                                    <td className="border border-gray-200 px-4 py-2">{patient.lastName}</td>
                                    <td className="border border-gray-200 px-4 py-2">{patient.city}</td>
                                    <td className="border border-gray-200 px-4 py-2">{patient.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Patients
