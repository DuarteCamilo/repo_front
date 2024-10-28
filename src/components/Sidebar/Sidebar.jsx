import { FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link, useLocation, useNavigate } from "react-router-dom"

const sidebarItems = {
    admin: [
        { path: '/admin/dentistas', label: 'Dentistas', icon: <FaUser /> },
        { path: '/admin/pacientes', label: 'Pacientes', icon: <FaUser /> },
    ]
}

const Sidebar = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem('user')) || {}
    const { username = '', role = '' } = user

    const getInitials = (name) => {
        return name.split(' ').map(word => word[0]).join('').toUpperCase()
    }

    const initials = getInitials(username)
    const items = sidebarItems[role] || []

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/')
    }

    return (
        <div className="w-64 h-screen text-gray-800 shadow-lg flex flex-col border-r border-gray-200">
            <div className="flex flex-col items-center my-8">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-700 text-white text-xl font-semibold">
                    {initials}
                </div>
                <p className="flex items-center justify-center mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 border border-blue-300 text-blue-700">{role}</p>
            </div>

            <ul className="flex flex-col space-y-2 p-4">
                {items.map((item) => (
                    <li key={item.path}>
                        <Link
                            to={item.path}
                            className={`flex items-center p-3 rounded-lg transition-colors duration-200 group 
                ${location.pathname === item.path ? 'bg-gray-100 text-blue-700' : 'hover:bg-gray-100 hover:text-blue-700 hover:font-semibold'}`
                            }
                        >
                            <span className={`transition-colors duration-200 ${location.pathname === item.path ? 'text-blue-700' : 'text-gray-600 group-hover:text-blue-700'}`}>
                                {item.icon}
                            </span>
                            <span className={`ml-4 transition-colors duration-200 ${location.pathname === item.path ? 'text-blue-700 font-semibold' : 'text-gray-600 group-hover:text-blue-700 hover:font-semibold'}`}>
                                {item.label}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>


            <div className="mt-auto p-4">
                <button 
                    onClick={handleLogout} 
                    className="flex items-center w-full p-3 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200"
                >
                    <FaSignOutAlt className="mr-2" />
                    <span>Cerrar Sesión</span>
                </button>
            </div>
        </div>
    )
}

export default Sidebar
