import Sidebar from "../../components/Sidebar/Sidebar"

const PatientHome = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="p-6 flex-1">
                <h1>Patient Home</h1>
            </div>
        </div>
    )
}

export default PatientHome
