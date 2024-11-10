import { FaExclamationTriangle } from 'react-icons/fa';
import '../../styles/Modal.css';

const ConfirmationModal = ({ show, onClose, onConfirm, message }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="flex justify-center mb-4">
                    <FaExclamationTriangle className="text-red-500 text-5xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">Confirmar Eliminación</h3>
                <p className="text-gray-600 text-center mb-6">
                    {message || '¿Estás seguro de realizar esta acción?'}
                </p>
                <div className="flex justify-between space-x-4">
                    <button
                        onClick={onClose}
                        className="w-full py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="w-full py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-medium transition-transform hover:scale-105"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;
