import { useState } from 'react';
import { RiLockLine, RiMailLine, RiUserLine } from 'react-icons/ri';
import { areFieldsEmpty, isValidEmail, isValidPassword } from '../../helpers/validationHelper';
import { toast } from 'react-toastify';
import Input from '../Input/Input';

const DentistForm = ({ initialData = { user: {}, dentist: {} }, onSave, onClose }) => {
    const [formData, setFormData] = useState(initialData);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            const updatedData = { ...prevData };

            if (name in prevData.user) {
                updatedData.user = { ...prevData.user, [name]: value };
            } else if (name in prevData.dentist) {
                updatedData.dentist = { ...prevData.dentist, [name]: value };
            }

            return updatedData;
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (areFieldsEmpty([...Object.values(formData.user), ...Object.values(formData.dentist)])) {
            toast.error('Todos los campos son obligatorios', { theme: 'light' });
            return;
        }

        if (!isValidEmail(formData.user.email)) {
            toast.error('Correo electrónico inválido', { theme: 'light' });
            return;
        }

        if (!isValidPassword(formData.user.password)) {
            toast.error('La contraseña debe tener al menos 6 caracteres', { theme: 'light' });
            return;
        }

        onSave(formData.user, formData.dentist);
    }

    const handleShowPassword = () => setShowPassword((prev) => !prev);

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                icon={<RiUserLine />}
                type="text"
                name="license"
                placeholder="Ingresa la matrícula"
                value={formData.dentist.license || ''}
                onChange={handleChange}
            />

            <Input
                icon={<RiUserLine />}
                type="text"
                name="name"
                placeholder="Ingresa el nombre"
                value={formData.user.name || ''}
                onChange={handleChange}
            />

            <Input
                icon={<RiUserLine />}
                type="text"
                name="lastname"
                placeholder="Ingresa el apellido"
                value={formData.user.lastname || ''}
                onChange={handleChange}
            />

            <Input
                icon={<RiMailLine />}
                type="email"
                name="email"
                placeholder="Ingresa el correo electrónico"
                value={formData.user.email || ''}
                onChange={handleChange}
            />

            {/* <Input
                icon={<RiUserLine />}
                type="text"
                name="username"
                placeholder="Ingresa el nombre de usuario"
                value={formData.username || ''}
                onChange={handleChange}
            />
 */}
            <Input
                icon={<RiLockLine />}
                type='password'
                name="password"
                placeholder="Ingresa la contraseña"
                value={formData.user.password || ''}
                onChange={handleChange}
                showPassword={showPassword}
                handleShowPassword={handleShowPassword}
            />

            <div className="flex justify-between space-x-4 mt-6">
                <button
                    onClick={onClose}
                    className="w-full py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition-colors"
                >
                    Cancelar
                </button>
                <button
                    type='submit'
                    className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium transition-transform hover:scale-105"
                >
                    Guardar
                </button>
            </div>
        </form>
    )
}

export default DentistForm
