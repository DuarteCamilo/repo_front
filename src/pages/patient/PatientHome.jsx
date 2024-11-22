import { useEffect, useState } from "react";
import { fetchAppointments, fetchAppointmentLabels, fetchDentists } from "../../services/patientService";
import Sidebar from "../../components/Sidebar/Sidebar";

const PatientHome = () => {
  const [appointments, setAppointments] = useState([]);
  const [appointmentLabels, setAppointmentLabels] = useState([]);
  const [dentists, setDentists] = useState({});

  // Obtener las citas y los detalles del paciente y odontólogo
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user')) || {};

        // Obtener las citas del paciente
        const appointmentsData = await fetchAppointments(user.patient_id);

        // Obtener las etiquetas de las citas (tipo de consulta)
        const appointmentLabelsData = await fetchAppointmentLabels(appointmentsData);

        
        const dentists = await fetchDentists(appointmentsData);

        // Setear los datos en los estados
        setAppointments(appointmentsData);
        setAppointmentLabels(appointmentLabelsData);
        setDentists(dentists);
      } catch (error) {
        console.error('Error al cargar las citas', error);
      }
    };

    loadAppointments();
  }, []);

  // Función para obtener el label (tipo de consulta) y su duración
  const getAppointmentLabel = (labelId) => {
      const label = appointmentLabels.find((label) => label.id === labelId);
      if (label) {
          return {
              name: label.name,
              duration: label.duration
          };
      }
      return { name: 'No disponible', duration: '00:00:00' };
  };

  // Función para obtener el nombre del dentista
    const getDentistName = (dentistId) => {
        const dentist = dentists.find((dentist) => dentist.dentist_id === dentistId); // Aseguramos que busquemos por dentist_id
        return dentist ? `${dentist.name}` : 'No disponible';
    };

  return (
      <div className="flex">
          <Sidebar />
          <div className="p-6 flex-1">
              <h1 className="text-2xl font-bold mb-6">Citas del Paciente</h1>
              <table className="custom-table">
                  <thead>
                      <tr>
                          <th>Fecha de Consulta</th>
                          <th>Tipo de Consulta</th>
                          <th>Duración</th>
                          <th>Nombre del Doctor</th>
                      </tr>
                  </thead>
                  <tbody>
                      {appointments.map((appointment) => {
                          const labelInfo = getAppointmentLabel(appointment.label_id);
                          return (
                              <tr key={appointment.id}>
                                  <td>{appointment.date}</td>
                                  <td>{labelInfo.name}</td>
                                  <td>{labelInfo.duration}</td>
                                  <td>{getDentistName(appointment.dentist_id)}</td>
                              </tr>
                          );
                      })}
                  </tbody>
              </table>
          </div>
      </div>
  );
};

export default PatientHome;