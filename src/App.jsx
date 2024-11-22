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
import RegisterShifts from './pages/patient/RegisterShifts'

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
          path='/paciente/registroCitas'
          element={
            <ProtectedRoute element={<RegisterShifts />} />
          }
        />
        <Route
          path='/odontologo/citas'
          element={
            // <ProtectedRoute element={<Shifts />} />
            <Shifts />
          }
        />
        <Route
          path='/odontologo/jornada'
          element={
            // <ProtectedRoute element={<DentistSchedule />} />
            <DentistSchedule />
          }
        />

        <Route
          path='/odontologo/inactividad'
          element={
            // <ProtectedRoute element={<DentistInactivity />} />
            <DentistInactivity />
          }
        />

        <Route
          path='/admin/odontologos'
          element={
            // <ProtectedRoute element={<Dentists />} />
            <Dentists />
          }
        />
        <Route
          path='/admin/pacientes'
          element={
            // <ProtectedRoute element={<Patients />} />
            <Patients />
          }
        />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
