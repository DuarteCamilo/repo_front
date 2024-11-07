import { useState } from 'react';
import { areFieldsEmpty } from '../../helpers/validationHelper';
import { toast } from 'react-toastify';
import Input from '../Input/Input';

const WorkScheduleForm = ({ onSave }) => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (areFieldsEmpty([startTime, endTime])) {
            toast.error('Todos los campos son obligatorios', { theme: 'light' });
            return;
        }

        onSave({ startTime, endTime });
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <h3>Registrar Jornada Laboral</h3>

            <Input
                type='time'
                name='startTime'
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
            />

            <Input
                type='time'
                name='endTime'
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
            />

            <button
                type="submit"
                className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium transition-transform hover:scale-105"
            >
                Guardar Jornada
            </button>
        </form>
    )
}

export default WorkScheduleForm
