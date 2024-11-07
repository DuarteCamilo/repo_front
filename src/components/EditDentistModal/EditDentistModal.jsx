import DentistForm from '../DentistForm/DentistForm';
import '../../styles/Modal.css';

const EditDentistModal = ({ show, onClose, onSave, dentist }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h3 className="modal-title">Editar Odontólogo</h3>
                <DentistForm
                    initialData={dentist}
                    onSave={onSave}
                    onClose={onClose}
                />
            </div>
        </div>
    );
};

export default EditDentistModal;
