import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthLayout from './layouts/auth/AuthLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Error404 from './pages/Error404'
import Patients from './pages/admin/Patients'
import Dentists from './pages/admin/Dentists'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Shifts from './pages/dentist/Shifts'
import DentistSchedule from './pages/dentist/DentistSchedule'
import DentistInactivity from './pages/dentist/DentistInactivity'
import PatientHome from './pages/patient/PatientHome'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthLayout />}>
          <Route index element={<Login />}></Route>
          <Route path='signup' element={<Register />} />
        </Route>
        <Route
          path='/paciente/inicio'
          element={
            <ProtectedRoute element={<PatientHome />} />
          }
        />
        <Route
          path='/odontologo/citas'
          element={
            <ProtectedRoute element={<Shifts />} />
          }
        />
        <Route
          path='/odontologo/jornada'
          element={
            <ProtectedRoute element={<DentistSchedule />} />
          }
        />

        <Route
          path='/odontologo/inactividad'
          element={
            <ProtectedRoute element={<DentistInactivity />} />
          }
        />

        <Route
          path='/admin/odontologos'
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
        <Route path='*' element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
