import { toast } from "react-toastify"
import Sidebar from "../../components/Sidebar/Sidebar"
import InactivityForm from "../../components/InactivityForm/InactivityForm"

const DentistInactivity = () => {

    const saveInactivity = (inactivity) => {
        toast.success('Inactividad guardada', { theme: 'light' })
        return
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="p-6 flex-1">
                <h2>Gestión De Estado</h2>
                <InactivityForm onSave={saveInactivity} />
            </div>
        </div>
    )
}

export default DentistInactivity
