import { toast } from "react-toastify"
import WorkScheduleForm from "../../components/WorkScheduleForm/WorkScheduleForm"
import Sidebar from "../../components/Sidebar/Sidebar"

const DentistSchedule = () => {
    const saveWorkSchedule = (schedule) => {
        toast.success('Jornada laboral guardada', { theme: 'light' })
        return
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="p-6 flex-1">
                <h2>Gestión de Horarios</h2>
                <WorkScheduleForm onSave={saveWorkSchedule} />
            </div>
        </div>
    )
}

export default DentistSchedule
