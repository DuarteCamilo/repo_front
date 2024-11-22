import { useState, useEffect } from "react";
import { areFieldsEmpty } from "../../helpers/validationHelper"
import { toast } from "react-toastify"
import Select from "../Select/Select";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";


const InactivityForm = ({ inactivity = {}, onSave }) => {
    const [inactivityData, setInactivity] = useState(inactivity);

    useEffect(() => {
        setInactivity(inactivity);
    }, [inactivity]);

    const handleDateChange = (field, date) => {
        setInactivity((prevData) => ({
            ...prevData,
            [field]: date,  
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let { startDate, endDate } = inactivityData;
        startDate = startDate ? new Date(startDate).toISOString().split('T')[0] : null;
        endDate = endDate ? new Date(endDate).toISOString().split('T')[0] : null;
        console.log(startDate)
        console.log(endDate)

        if (areFieldsEmpty([startDate, endDate])) {
            toast.error('Todos los campos son obligatorios', { theme: 'light' });
            return;
        }

        if (startDate > endDate) {
            toast.error('La fecha de inicio no puede ser mayor a la fecha de fin', { theme: 'light' });
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        if (startDate < today) {
            toast.error('La fecha de inicio no puede ser menor a la fecha actual', { theme: 'light' });
            return;
        }

        onSave({ startDate, endDate });
    }

    // const options = [
    //     { value: 'vacaciones', label: 'Vacaciones' },
    //     { value: 'incapacidad', label: 'Incapacidad' }
    // ];

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
                <DatePicker
                    id="startDate"
                    selected={inactivityData.startDate}
                    onChange={(date) => handleDateChange("startDate", date)}
                    minDate={new Date()}
                    placeholderText="Selecciona la fecha de inicio"
                    className="custom-input"
                />
                <FaCalendarAlt className="icon" />
            </div>

            <div className="relative">
                <DatePicker
                    id="endDate"
                    selected={inactivityData.endDate}
                    onChange={(date) => handleDateChange("endDate", date)} 
                    minDate={new Date(inactivityData.startDate)}
                    placeholderText="Selecciona la fecha de fin"
                    className="custom-input"
                    disabled={!inactivityData.startDate}
                />
                <FaCalendarAlt className="icon" />
            </div>
{/* 
            <Select
                name='reason'
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                options={options}
                placeholder={'Selecciona un motivo'}
            /> */}

            <button
                type="submit"
                className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium transition-transform hover:scale-105"
            >
                Guardar Inactividad
            </button>
        </form>
    )
}

export default InactivityForm
