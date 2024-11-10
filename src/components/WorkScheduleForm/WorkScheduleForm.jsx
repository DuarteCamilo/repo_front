import { useState } from 'react';
import { areFieldsEmpty } from '../../helpers/validationHelper';
import { toast } from 'react-toastify';
import Input from '../Input/Input';

const WorkScheduleForm = ({ initialData = {}, onSave }) => {
    const [schedule, setSchedule] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSchedule((prevSchedule) => ({ ...prevSchedule, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const { startTime, endTime } = schedule;

        if (areFieldsEmpty([startTime, endTime])) {
            toast.error('Todos los campos son obligatorios', { theme: 'light' });
            return;
        }

        if (startTime > endTime) {
            toast.error('La hora de inicio no puede ser mayor a la hora de fin', { theme: 'light' });
            return;
        }

        onSave('12345', schedule);
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <Input
                type='time'
                name='startTime'
                value={schedule.startTime || ''}
                onChange={handleChange}
            />

            <Input
                type='time'
                name='endTime'
                value={schedule.endTime || ''}
                onChange={handleChange}
                disabled={!schedule.startTime}
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
