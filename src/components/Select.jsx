import { RiArrowDownSLine } from 'react-icons/ri'

const Select = ({ icon, name, value, onChange, options, placeholder }) => {
    return (
        <div className='relative'>
            {icon && <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500'>{icon}</span>}
            <select
                name={name}
                value={value}
                onChange={onChange}
                className='w-full p-3 px-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none'
            >
                <option value=''>{placeholder}</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
            <RiArrowDownSLine className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none' />
        </div>
    )
}

export default Select
