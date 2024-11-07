import { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify';
import { deleteDentist, fetchDentists, registerDentist, updateDentist } from '../../services/dentistService'
import Sidebar from '../../components/Sidebar/Sidebar'
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import RegisterDentistModal from '../../components/RegisterDentistModal/RegisterDentistModal';
import EditDentistModal from '../../components/EditDentistModal/EditDentistModal';
import '../../styles/Table.css'

const Dentists = () => {
    const [dentists, setDentists] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedDentist, setSelectedDentist] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

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

    const handleRegisterDentist = async (newDentist) => {
        try {
            const response = await registerDentist(newDentist)
            console.log(response.dentist)
            setDentists([...dentists, response.dentist])
            toast.success(response.message, { theme: 'light' })
        } catch (error) {
            toast.error(error.message || 'Error registrando odontólogo', { theme: 'light' })
        } finally {
            setShowAddModal(false)
        }
    }

    const handleEdit = (license) => {
        const dentist = dentists.find((d) => d.license === license)
        setSelectedDentist(dentist)
        setShowEditModal(true)
    }

    const handleUpdateDentist = async (updatedDentist) => {
        try {
            const response = await updateDentist(updatedDentist.license, updatedDentist)
            setDentists(dentists.map((d) => (d.license === updatedDentist.license ? response.dentist : d)))
            toast.success(response.message, { theme: 'light' })
        } catch (error) {
            toast.error(error.message || 'Error actualizando odontólogo', { theme: 'light' })
        } finally {
            setShowEditModal(false)
            setSelectedDentist(null)
        }
    }

    const handleDelete = (license) => {
        const dentist = dentists.find((d) => d.license === license)
        setSelectedDentist(dentist)
        setShowModal(true)
    }

    const handleConfirmDelete = async () => {
        try {
            const response = await deleteDentist(selectedDentist.license);
            setDentists(dentists.filter((d) => d.license !== selectedDentist.license));
            toast.success(response.message, { theme: 'light' });
        } catch (error) {
            toast.error(error.message || 'Error eliminando odontólogo', { theme: 'light' });
        } finally {
            setShowModal(false);
            setSelectedDentist(null);
        }
    }

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
                <div className='flex justify-between mb-4'>
                    <input
                        type="text"
                        placeholder='Buscar odontólogo'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-4 py-2 w-full'
                    />
                    <button
                        onClick={() => setShowAddModal(true)}
                        className='ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300'
                    >
                        Nuevo
                    </button>
                </div>

                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Matricula</th>
                            <th>Nombres </th>
                            <th>Apellidos</th>
                            <th>Jornada</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDentists.map((dentist) => (
                            <tr key={dentist.license}>
                                <td>{dentist.license}</td>
                                <td>{dentist.name}</td>
                                <td>{dentist.lastname}</td>
                                <td>
                                    {dentist.startTime} - {dentist.endTime}
                                </td>
                                <td className="justify-center text-center">
                                    {dentist.active ?
                                        <span className='items-center justify-center px-3 py-1 text-xs font-semibold rounded-full bg-green-100 border border-green-300 text-green-700 uppercase'>
                                            Activo
                                        </span>
                                        :
                                        <span className='items-center justify-center px-3 py-1 text-xs font-semibold rounded-full bg-red-100 border border-red-300 text-red-700 uppercase'>
                                            Inactivo
                                            {dentist.absenceDays && (
                                                <span className='ml-1 text-xs text-red-700'>
                                                    ({dentist.absenceDays})
                                                </span>
                                            )}
                                        </span>
                                    }
                                </td>
                                <td className='text-center'>
                                    <button
                                        onClick={() => handleEdit(dentist.license)}
                                        className='mr-2 text-yellow-400 px-3 py-1 inline-flex items-center'
                                    >
                                        <FaEdit className='mr-1' /> Editar
                                    </button>

                                    <button
                                        onClick={() => handleDelete(dentist.license)}
                                        className='text-red-500 px-3 py-1 inline-flex items-center'
                                    >
                                        <FaTrash className='mr-1' /> Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <ConfirmationModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={handleConfirmDelete}
                />

                <RegisterDentistModal
                    show={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSave={handleRegisterDentist}
                />

                <EditDentistModal
                    show={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    onSave={handleUpdateDentist}
                    dentist={selectedDentist}
                />
            </div>
        </div>
    )
}

export default Dentists
