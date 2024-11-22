import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar/Sidebar";
import { fetchDentists, fetchUser } from "../../services/dentistService";
import { registerCompleteShift } from "../../services/patientService";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css"; // Asegúrate de importar el CSS

const RegisterShifts = () => {
  const [dentists, setDentists] = useState([]);
  const [selectedDentist, setSelectedDentist] = useState("");
  const [selectedConsultation, setSelectedConsultation] = useState("");
  const [selectedDate, setSelectedDate] = useState(null); // Estado para la fecha
  const [consultationOptions] = useState([
    { value: "urgencia", label: "Urgencia: 2 horas" },
    { value: "control", label: "Control: 1 hora" },
    { value: "higiene", label: "Higiene: 1 hora" },
    { value: "valoracion", label: "Valoración: 1 hora" },
  ]);

  useEffect(() => {
    const loadDentists = async () => {
      try {
        const response = await fetchDentists();
        const dentistOptions = await Promise.all(
          response.map(async (dentist) => {
            const user = await fetchUser(dentist.user_id);
            return {
              id: dentist.id,
              name: dentist.license + " - " + user.name,
            };
          })
        );

        setDentists(dentistOptions);
      } catch (error) {
        console.error("Error fetching dentists:", error);
        toast.error("Error al cargar odontólogos.", { theme: "light" });
      }
    };

    loadDentists();
  }, []);

  const getConsultationDuration = (consultationType) => {
    let hours = 0;
    let minutes = 0;

    switch (consultationType) {
      case "urgencia":
        hours = 2;
        break;
      case "control":
      case "higiene":
      case "valoracion":
        hours = 1;
        break;
      default:
        break;
    }

    const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;

    return formattedTime;
  };

  const handleSave = async () => {
    if (!selectedDentist || !selectedConsultation || !selectedDate) {
      toast.error("Debe seleccionar un odontólogo, un tipo de consulta y una fecha.", { theme: "light" });
      return;
    }

    try {
      const time = getConsultationDuration(selectedConsultation);

      const appointment_label = {
        name: selectedConsultation,
        duration: time,
      };

      // Convertimos la fecha seleccionada a formato YYYY-MM-DD
      const formattedDate = selectedDate.toISOString().split("T")[0];

      const user = JSON.parse(localStorage.getItem("user")) || {};

      const appointment = {
        date: formattedDate, // Usamos la fecha seleccionada
        patient_id: user.patient_id,
        dentist_id: parseInt(selectedDentist, 10),
      };

      console.log(appointment);

      // Llamada al servicio para registrar la cita
      await registerCompleteShift(appointment_label, appointment);

      toast.success("Turno registrado con éxito", { theme: "light" });
    } catch (error) {
      toast.error("Error al registrar el turno.", { theme: "light" });
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 flex-1">
        <div className="w-full max-w-lg mx-auto rounded-2xl shadow-lg p-8 bg-white">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Registrar Cita
          </h2>

          <div className="mb-6">
            <label htmlFor="dentist" className="block text-gray-700">Odontólogo</label>
            <select
              id="dentist"
              className="mt-2 w-full p-3 border rounded-lg"
              value={selectedDentist}
              onChange={(e) => setSelectedDentist(e.target.value)}
            >
              <option value="">Seleccione un odontólogo</option>
              {dentists.map((dentist) => (
                <option key={dentist.id} value={dentist.id}>
                  {dentist.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="consultation" className="block text-gray-700">Tipo de Consulta</label>
            <select
              id="consultation"
              className="mt-2 w-full p-3 border rounded-lg"
              value={selectedConsultation}
              onChange={(e) => setSelectedConsultation(e.target.value)}
            >
              <option value="">Seleccione un tipo de consulta</option>
              {consultationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="date" className="block text-gray-700">Fecha de la Cita</label>
            <div className="relative">
              <DatePicker
                id="date"
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()} // Impide seleccionar fechas pasadas
                placeholderText="Selecciona la fecha"
                className="w-full p-3 border rounded-lg pl-10" // Añadimos padding-left para dejar espacio para el ícono
              />
              {/* Icono del calendario alineado a la izquierda */}
              <FaCalendarAlt className="absolute top-3 left-3 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <div className="text-center">
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
              onClick={handleSave}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterShifts;
