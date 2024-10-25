import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri'

const Input = ({ icon, type, name, placeholder, value, onChange, showPassword, handleShowPassword }) => {
    return (
        <div className='relative'>
            {icon && <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500'>{icon}</span>}
            <input
                type={type === 'password' && showPassword ? 'text' : type}
                name={name}
                placeholder={placeholder}
                className='w-full p-3 px-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={value}
                onChange={onChange}
            />
            {type === 'password' && (
                showPassword ? (
                    <RiEyeOffLine className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer' onClick={handleShowPassword} />
                ) : (
                    <RiEyeLine className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer' onClick={handleShowPassword} />
                )
            )}
        </div>
    )
}

export default Input
