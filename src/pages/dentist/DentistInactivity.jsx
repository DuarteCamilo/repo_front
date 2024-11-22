import { useEffect, useState } from 'react'
import { toast } from "react-toastify"
import Sidebar from "../../components/Sidebar/Sidebar"
import InactivityForm from "../../components/InactivityForm/InactivityForm"
import { registerInactivity, fetchDentist } from "../../services/dentistService"

const DentistInactivity = () => {
    const [inactivity, setInactivity] = useState([])

    useEffect(() => {
        const loadSchedule = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user')) || {};
                const response = await fetchDentist(user.dentist_id);

                const inactivity = {
                    startDate: response.inactivity_start_date || '2024-11-22' + 'T00:00:00',
                    endDate: response.inactivity_end_date || '2024-11-22' + 'T00:00:00',
                }
                
                setInactivity(inactivity)
            } catch (error) {
                console.error('Error loading schedule', error)
            }
        }
        loadSchedule()
    }, [])
    
    const handleRegisterInactivity = async (inactivity) => {
        try {
            const user = JSON.parse(localStorage.getItem('user')) || {};
            await registerInactivity(user.dentist_id, inactivity);
            toast.success('Inactividad guardada', { theme: 'light' })
        } catch (error) {
            toast.error(error.message || 'Error registrando jornada laboral', { theme: 'light' });
        }
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col items-center p-8">
                <div className="w-full max-w-lg rounded-2xl shadow-lg p-8 mt-10">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                        Registrar Inactividad
                    </h2>
                    <InactivityForm 
                        inactivity={inactivity}
                        onSave={handleRegisterInactivity} />
                </div>
            </div>
        </div>
    )
}

export default DentistInactivity
