import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import './Input.css';

const Input = ({ icon, type, name, placeholder, value, onChange, showPassword, handleShowPassword }) => {
    return (
        <div className='relative'>
            {icon && <span className='icon'>{icon}</span>}
            <input
                type={type === 'password' && showPassword ? 'text' : type}
                name={name}
                placeholder={placeholder}
                className='custom-input'
                value={value}
                onChange={onChange}
            />
            {type === 'password' && (
                showPassword ? (
                    <RiEyeOffLine className='pass-icon' onClick={handleShowPassword} />
                ) : (
                    <RiEyeLine className='pass-icon' onClick={handleShowPassword} />
                )
            )}
        </div>
    )
}

export default Input
