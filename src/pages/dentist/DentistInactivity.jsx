import { toast } from "react-toastify"
import Sidebar from "../../components/Sidebar/Sidebar"
import InactivityForm from "../../components/InactivityForm/InactivityForm"

const DentistInactivity = () => {

    const saveInactivity = (inactivity) => {
        toast.success('Inactividad guardada', { theme: 'light' })
        return
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col items-center p-8">
                <div className="w-full max-w-lg rounded-2xl shadow-lg p-8 mt-10">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                        Registrar Inactividad
                    </h2>
                    <InactivityForm onSave={saveInactivity} />
                </div>
            </div>
        </div>
    )
}

export default DentistInactivity
