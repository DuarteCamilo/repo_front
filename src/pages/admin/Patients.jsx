import { useEffect, useState } from "react"
import { fetchPatients } from "../../services/patientService"
import Sidebar from "../../components/Sidebar/Sidebar"
import '../../styles/Table.css'
import { fetchUser } from "../../services/userService"

const Patients = () => {
    const [patients, setPatients] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const loadPatients = async () => {
            try {
                const data = await fetchPatients();

                const patientsWithUser = await Promise.all(
                    data.map(async (patient) => {
                        const user = await fetchUser(patient.user_id);
                        return { ...patient, user };
                    })
                );

                setPatients(patientsWithUser);
            } catch (error) {
                console.error('Error loading patients', error)
            }
        };

        loadPatients();

    }, []);

    const filteredPatients = patients.filter((patient) => {
        const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase()
        return (
            // patient.dni.includes(searchTerm) ||
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

                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>DNI</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Ciudad Residencia</th>
                            <th>Correo Electrónico</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.map((patient) => (
                            <tr key={patient.dni}>
                                <td>{patient.dni}</td>
                                <td>{patient.user.name}</td>
                                <td>{patient.user.lastname}</td>
                                <td>{patient.address}</td>
                                <td>{patient.user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Patients
