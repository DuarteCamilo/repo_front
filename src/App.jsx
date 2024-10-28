import { BrowserRouter, Routes, Route } from 'react-router-dom'

// layouts 
import AuthLayout from './layouts/auth/AuthLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Error404 from './pages/Error404'
import Patients from './pages/admin/Patients'
import Dentists from './pages/admin/Dentists'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthLayout />}>
          <Route index element={<Login />}></Route>
          <Route path='signup' element={<Register />} />
        </Route>
        <Route
          path='/admin/dentistas'
          element={
            <ProtectedRoute element={<Dentists />} />
          }
        />
        <Route
          path='/admin/pacientes'
          element={
            <ProtectedRoute element={<Patients />} />
          }
        />
        <Route path='*' element={<Error404 />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
