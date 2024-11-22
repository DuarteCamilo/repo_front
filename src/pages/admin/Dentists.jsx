import { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify';
import { deleteDentist, fetchDentists, registerCompleteDentist, registerDentist, updateDentist } from '../../services/dentistService'
import Sidebar from '../../components/Sidebar/Sidebar'
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import RegisterDentistModal from '../../components/RegisterDentistModal/RegisterDentistModal';
import EditDentistModal from '../../components/EditDentistModal/EditDentistModal';
import '../../styles/Table.css'
import { fetchUser } from '../../services/userService';

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

                const dentistsWithUser = await Promise.all(
                    data.map(async (dentist) => {
                        const user = await getUser(dentist.user_id);
                        let absenceDays = 0;

                        if (dentist.inactivity_start_date && dentist.inactivity_end_date) {
                            const startDate = new Date(dentist.inactivity_start_date);
                            const endDate = new Date(dentist.inactivity_end_date);
                            absenceDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
                        }

                        return { ...dentist, user, absenceDays };
                    })
                );
                setDentists(dentistsWithUser)
            } catch (error) {
                console.error('Error loading dentists', error)
            }
        }
        loadDentists()
    }, [])

    const handleRegisterDentist = async (user, newDentist) => {
        try {
            await registerCompleteDentist(user, newDentist)
            toast.success('Odontólogo registrado correctamente', { theme: 'light' })
            setDentists(prevDentists => [...prevDentists, { newDentist, user }])
        } catch (error) {
            toast.error(error.message || 'Error registrando odontólogo', { theme: 'light' })
        } finally {
            setShowAddModal(false)
        }
    }

    const handleEdit = (id) => {
        const dentist = dentists.find((d) => d.id === id)
        setSelectedDentist(dentist)
        setShowEditModal(true)
    }

    const handleUpdateDentist = async (user, updatedDentist) => {
        try {
            await updateDentist(user, updatedDentist)
            toast.success('Odontólogo actualizado correctamente', { theme: 'light' })
            // setDentists((prevDentists) => prevDentists.map((d) => (d.id === updatedDentist.id ? updatedDentist : d)))
        } catch (error) {
            console.log(error.message)
            toast.error(error.message || 'Error actualizando odontólogo', { theme: 'light' })
        } finally {
            setShowEditModal(false)
            setSelectedDentist(null)
        }
    }

    const handleDelete = (id) => {
        const dentist = dentists.find((d) => d.id === id)
        setSelectedDentist(dentist)
        setShowModal(true)
    }

    const handleConfirmDelete = async () => {
        try {
            await deleteDentist(selectedDentist.id, selectedDentist.user_id);
            toast.success('Odontólogo eliminado correctamente', { theme: 'light' });
            setDentists((prevDentists) => prevDentists.filter((d) => d.id !== selectedDentist.id));
        } catch (error) {
            toast.error(error.message || 'Error eliminando odontólogo', { theme: 'light' });
        } finally {
            setShowModal(false);
            setSelectedDentist(null);
        }
    }

    const filteredDentists = dentists.filter((dentist) => {
        const fullName = `${dentist.user.name} ${dentist.user.lastname}`.toLowerCase()
        return (
            // dentist.user.license.includes(searchTerm) ||
            fullName.includes(searchTerm.toLowerCase())
        )
    })

    const getUser = (id) => {
        return fetchUser(id);
    }

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
                            <tr key={`${dentist.id}-${dentist.user_id}`}>
                                <td>{dentist.license}</td>
                                <td>{dentist.user.name}</td>
                                <td>{dentist.user.lastname}</td>
                                <td>
                                    {dentist.workday_start_time} - {dentist.workday_end_time}
                                </td>
                                <td className="justify-center text-center">
                                    {dentist.absenceDays === 0 ?
                                        <span className='items-center justify-center px-3 py-1 text-xs font-semibold rounded-full bg-green-100 border border-green-300 text-green-700 uppercase'>
                                            Activo
                                        </span>
                                        :
                                        <span className='items-center justify-center px-3 py-1 text-xs font-semibold rounded-full bg-red-100 border border-red-300 text-red-700 uppercase'>
                                            Inactivo
                                            {dentist.absenceDays > 0 && (
                                                <span className='ml-1 text-xs text-red-700'>
                                                    ({dentist.absenceDays})
                                                </span>
                                            )}
                                        </span>
                                    }
                                </td>
                                <td className='text-center'>
                                    <button
                                        onClick={() => handleEdit(dentist.id)}
                                        className='mr-2 text-yellow-400 px-3 py-1 inline-flex items-center'
                                    >
                                        <FaEdit className='mr-1' /> Editar
                                    </button>

                                    <button
                                        onClick={() => handleDelete(dentist.id)}
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
