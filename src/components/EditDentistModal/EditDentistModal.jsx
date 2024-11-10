import DentistForm from '../DentistForm/DentistForm';
import '../../styles/Modal.css';

const EditDentistModal = ({ show, onClose, onSave, dentist }) => {
    if (!show) return null;

    const initialData = dentist
        ? {
            user: {
                id: dentist.user.id || '',
                name: dentist.user.name || '',
                lastname: dentist.user.lastname || '',
                email: dentist.user.email || '',
                password: dentist.user.password || '',
                role_ids: dentist.user.role_ids || [3]
            },
            dentist: {
                id: dentist.id || '',
                license: dentist.license || '',
                user_id: dentist.user_id || '',
                workday_start_time: dentist.workday_start_time || '',
                workday_end_time: dentist.workday_end_time || '',
                inactivity_start_date: dentist.inactivity_start_date || null,
                inactivity_end_date: dentist.inactivity_end_date || null
            }
        }
        : null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h3 className="modal-title">Editar Odontólogo</h3>
                <DentistForm
                    initialData={initialData}
                    onSave={onSave}
                    onClose={onClose}
                />
            </div>
        </div>
    );
};

export default EditDentistModal;
