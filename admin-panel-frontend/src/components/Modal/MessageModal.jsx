
const MessageModal = ({ isOpen, title, message, onClose, onConfirm, confirmText = "Confirm", cancelText = "Cancel" }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm sm:max-w-md md:max-w-lg">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">{title}</h2>
                <p className="text-gray-700 mb-6 text-base sm:text-lg">{message}</p>
                <div className="flex justify-end space-x-3">
                    {onConfirm && (
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors duration-200"
                        >
                            {cancelText}
                        </button>
                    )}
                    <button
                        onClick={() => {
                            if (onConfirm) {
                                onConfirm();
                            }
                            onClose();
                        }}
                        className={`px-4 py-2 rounded-md transition-colors duration-200 ${onConfirm ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                    >
                        {onConfirm ? confirmText : "Close"}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default MessageModal;