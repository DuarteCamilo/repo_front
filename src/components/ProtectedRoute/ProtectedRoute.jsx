import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
    const user = localStorage.getItem('user');
    return user ? element : <Navigate to="/" replace />
}

export default ProtectedRoute
