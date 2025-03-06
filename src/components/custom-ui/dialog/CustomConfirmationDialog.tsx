import {FC} from "react";
import CustomLoadingBtn from "@/components/custom-ui/loading/CustomLoadingBtn";

interface ConfirmationDialogProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    message: string;
    isLoading?: boolean
}
const ConfirmationDialog:FC<ConfirmationDialogProps> = (
    { isOpen, onConfirm, onCancel, title, message, isLoading }
) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-96">
                <h3 className="text-lg font-semibold mb-4">{title}</h3>
                <p className="text-gray-600 mb-6">{message}</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                    >
                        Cancel
                    </button>
                    {isLoading ? <CustomLoadingBtn /> : <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded"
                    >
                        Confirm
                    </button>}
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;