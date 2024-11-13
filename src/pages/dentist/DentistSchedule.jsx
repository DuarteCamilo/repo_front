import { toast } from "react-toastify"
import WorkScheduleForm from "../../components/WorkScheduleForm/WorkScheduleForm"
import Sidebar from "../../components/Sidebar/Sidebar"
import { registerSchedule } from "../../services/dentistService"

const DentistSchedule = () => {
    const handleRegisterSchedule = async (license, schedule) => {
        try {
            const response = await registerSchedule(license, schedule);
            toast.success('Jornada Registrada', { theme: 'light' });
        } catch (error) {
            toast.error(error.message || 'Error registrando jornada laboral', { theme: 'light' });
        }
    }

    const initialData = {
        startTime: '',
        endTime: '',
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
