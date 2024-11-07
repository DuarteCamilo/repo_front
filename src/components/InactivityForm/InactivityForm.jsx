import { useState } from "react";
import { areFieldsEmpty } from "../../helpers/validationHelper"
import { toast } from "react-toastify"
import Select from "../Select/Select";
import Input from "../Input/Input";

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

        onSave({ startDate, endDate, reason });
    }

    const options = [
        { value: 'vacaciones', label: 'Vacaciones' },
        { value: 'incapacidad', label: 'Incapacidad' }
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3>Registrar Inactividad Temporal</h3>

            <Input
                type='date'
                name='startDate'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />

            <Input
                type='date'
                name='endDate'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />

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
