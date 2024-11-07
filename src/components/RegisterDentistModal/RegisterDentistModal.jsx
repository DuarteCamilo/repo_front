import DentistForm from "../DentistForm/DentistForm";
import '../../styles/Modal.css';

const RegisterDentistModal = ({ show, onClose, onSave }) => {
    if (!show) return null;

    const initialData = {
        license: '',
        name: '',
        lastname: '',
        email: '',
        password: ''
    };

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
