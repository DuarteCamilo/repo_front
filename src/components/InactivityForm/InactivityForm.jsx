import { useState } from "react";
import { areFieldsEmpty } from "../../helpers/validationHelper"
import { toast } from "react-toastify"
import Select from "../Select/Select";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";


const InactivityForm = ({ onSave }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (areFieldsEmpty([startDate, endDate, reason])) {
            toast.error('Todos los campos son obligatorios', { theme: 'light' });
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            toast.error('La fecha de inicio no puede ser mayor a la fecha de fin', { theme: 'light' });
            return;
        }

        if (new Date() > new Date(startDate)) {
            toast.error('La fecha de inicio no puede ser menor a la fecha actual', { theme: 'light' });
            return;
        }

        onSave({ startDate, endDate, reason });
    }

    const options = [
        { value: 'vacaciones', label: 'Vacaciones' },
        { value: 'incapacidad', label: 'Incapacidad' }
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
                <DatePicker
                    id="startDate"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    minDate={new Date()}
                    placeholderText="Selecciona la fecha de inicio"
                    className="custom-input"
                />
                <FaCalendarAlt className="icon" />
            </div>

            <div className="relative">
                <DatePicker
                    id="endDate"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    minDate={new Date(startDate)}
                    placeholderText="Selecciona la fecha de fin"
                    className="custom-input"
                    disabled={!startDate}
                />
                <FaCalendarAlt className="icon" />
            </div>

            <Select
                name='reason'
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                options={options}
                placeholder={'Selecciona un motivo'}
            />

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
