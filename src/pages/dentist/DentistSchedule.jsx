import { useEffect, useState } from 'react'
import { toast } from "react-toastify"
import WorkScheduleForm from "../../components/WorkScheduleForm/WorkScheduleForm"
import Sidebar from "../../components/Sidebar/Sidebar"
import { registerSchedule,fetchDentist } from "../../services/dentistService"

const DentistSchedule = () => {
    const [initialData, setInitialData] = useState([])

    useEffect(() => {
        const loadSchedule = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user')) || {};
                const response = await fetchDentist(user.dentist_id);

                const initialData = {
                    startTime: response.workday_start_time,
                    endTime: response.workday_end_time,
                }
                
                setInitialData(initialData)
            } catch (error) {
                console.error('Error loading schedule', error)
            }
        }
        loadSchedule()
    }, [])
    
    const handleRegisterSchedule = async (schedule) => {
        try {
            const user = JSON.parse(localStorage.getItem('user')) || {};
            await registerSchedule(user.dentist_id, schedule);
            toast.success('Jornada Registrada', { theme: 'light' });
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
                        Registrar Jornada Laboral
                    </h2>
                    <WorkScheduleForm
                        initialData={initialData}
                        onSave={handleRegisterSchedule}
                    />
                </div>
            </div>
        </div>
    )
}

export default DentistSchedule
