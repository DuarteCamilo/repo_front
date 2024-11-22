import DentistForm from "../DentistForm/DentistForm";
import '../../styles/Modal.css';

const RegisterDentistModal = ({ show, onClose, onSave }) => {
    if (!show) return null;
   const initialData = {
        user: {
            email: '',
            password: '',
            name: '',
            lastname: '',
            is_admin: false
        },
        dentist: {
            license: '',
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h3 className="modal-title">Registrar Odontólogo</h3>
                <DentistForm
                    initialData={initialData}
                    onSave={onSave}
                    onClose={onClose}
                />
            </div>
        </div>
    )
}

export default RegisterDentistModal
