const SubmitButton = ({ text, onClick }) => {
    return (
        <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition-colors duration-200"
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default SubmitButton
