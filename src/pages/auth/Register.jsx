import { useState } from 'react'
import { RiBuildingLine, RiLockLine, RiMailLine, RiUserLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Input from '../../components/Input/Input'
import Select from '../../components/Select/Select'
import SubmitButton from '../../components/SubmitButton/SubmitButton'
import { areFieldsEmpty, isValidDNI, isValidEmail, isValidPassword, passwordsMatch } from '../../helpers/validationHelper'

const Register = () => {
    const [dni, setDni] = useState('')
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [city, setCity] = useState('')
    const [email, setEmail] = useState('')
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleShowPasswordConfirm = () => {
        setShowPasswordConfirm(!showPasswordConfirm)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (areFieldsEmpty([dni, name, lastName, city, email, user, password, passwordConfirm])) {
            toast.error('Todos los campos son obligatorios', {
                theme: 'light'
            })
            return
        }

        if (!isValidDNI(dni)) {
            toast.error('DNI inválido, debe ser de 8 o 10 dígitos', {
                theme: 'light'
            })
            return
        }

        if (!isValidEmail(email)) {
            toast.error('Correo electrónico inválido', {
                theme: 'light',
            });
            return;
        }

        if (!isValidPassword(password)) {
            toast.error('La contraseña debe tener al menos 6 caracteres', {
                theme: 'light'
            })
            return
        }

        if (!passwordsMatch(password, passwordConfirm)) {
            toast.error('Las contraseñas no coinciden', {
                theme: 'light'
            })
            return
        }

        console.log(dni, name, lastName, city, email, password, passwordConfirm)
    }

    const cityOptions = [
        { value: 'Armenia', label: 'Armenia' },
        { value: 'Pereira', label: 'Pereira' },
        { value: 'Manizales', label: 'Manizales' },
        { value: 'Medellin', label: 'Medellín' },
    ]

    return (
        <div className='bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden p-8'>

            <div className='flex-1 p-8'>
                <h1 className='text-4xl font-bold text-gray-800'>Bienvenido a</h1>
                <h2 className='text-5xl font-bold text-blue-500'>Adiós Caries</h2>
            </div>

            <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                <Input
                    icon={<RiUserLine />}
                    type='text'
                    name='dni'
                    placeholder='Ingresa tu DNI'
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                />

                <Input
                    icon={<RiUserLine />}
                    type='text'
                    name='name'
                    placeholder='Ingresa tu(s) nombre(s)'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <Input
                    icon={<RiUserLine />}
                    type='text'
                    name='lastName'
                    placeholder='Ingresa tu(s) apellido(s)'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <Select
                    icon={<RiBuildingLine />}
                    name={'city'}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    options={cityOptions}
                    placeholder={'Selecciona una ciudad'}
                />

                <Input
                    icon={<RiMailLine />}
                    type='email'
                    name='email'
                    placeholder='Ingresa tu correo electrónico'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    icon={<RiUserLine />}
                    type='text'
                    name='user'
                    placeholder='Ingresa tu nombre de usuario'
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />

                <Input
                    icon={<RiLockLine />}
                    type='password'
                    name='password'
                    placeholder='Ingresa tu contraseña'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    showPassword={showPassword}
                    handleShowPassword={handleShowPassword}
                />

                <Input
                    icon={<RiLockLine />}
                    type='password'
                    name='passwordConfirm'
                    placeholder='Confirma tu contraseña'
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    showPassword={showPasswordConfirm}
                    handleShowPassword={handleShowPasswordConfirm}
                />

                <SubmitButton text='Registrarse' className='col-span-1 md:col-span-2' />

                <p className='text-center text-gray-600 mt-5'>
                    ¿Ya tienes una cuenta?
                    <Link to='/' className='ml-1 text-blue-500 font-semibold hover:underline'>Inicia Sesión</Link>
                </p>
            </form>

        </div>
    )
}

export default Register
