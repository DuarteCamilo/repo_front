import { useState } from 'react';
import { RiLockLine, RiUserLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../../components/Input/Input';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import { loginUser } from '../../services/authService';
import { areFieldsEmpty, isValidEmail } from '../../helpers/validationHelper';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (areFieldsEmpty([email, password])) {
            toast.error('Todos los campos son obligatorios', { theme: 'light' })
            return
        }

        if (!isValidEmail(email)) {
            toast.error('Correo electrónico inválido', {
                theme: 'light',
            });
            return;
        }

        try {
            const data = await loginUser(email, password)

            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user))

                if (data.user.role === 'admin') {
                    navigate('/admin/dentistas')
                } else {
                    console.log('El usuario es paciente')
                }
            }
        } catch (error) {
            toast.error(error.message || 'Error de conexión', { theme: 'light' })
        }
    };

    return (
        <div className='bg-white rounded-lg shadow-lg flex flex-col lg:flex-row w-full max-w-4xl overflow-hidden'>

            <div className='flex-1 p-8'>
                <h1 className='text-4xl font-bold text-gray-800'>Bienvenido a</h1>
                <h2 className='text-5xl font-bold text-blue-500'>Adiós Caries</h2>
                <p className='mt-4 text-gray-600'>
                   Inicia sesión para acceder a tu cuenta: agenda tus citas y gestiona tu salud dental con facilidad. 
                </p>
            </div>

            <div className='flex-1 bg-gray-100 p-8'>
                <form onSubmit={handleSubmit} className="space-y-6">

                    <Input
                        icon={<RiUserLine />}
                        type="text"
                        name="email"
                        placeholder="Ingresa tu correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        icon={<RiLockLine />}
                        type="password"
                        name="password"
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        showPassword={showPassword}
                        handleShowPassword={handleShowPassword}
                    />

                    <SubmitButton text='Iniciar sesión' />

                </form>
                <p className="text-center text-gray-600 mt-5">
                    ¿No te encuentras registrado?
                    <Link to='signup' className='ml-1 text-blue-500 font-semibold hover:underline'>Regístrate</Link>
                </p>
            </div>
        </div>
    )
}

export default Login
