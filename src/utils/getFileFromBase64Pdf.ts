import {toast} from "react-toastify";

export function getFileFromBase64Pdf(base64String: string, fileName: string, type?: string ) {

    if (!base64String?.includes(",")) {
        throw new Error("Invalid base64 string format");
    }

    // Ensure the base64 string contains metadata
    const parts = base64String.split(",");
    if (parts.length !== 2) {
        throw new Error("Invalid base64 string format");
    }

    const base64Data = parts[1];

    // Decode base64 string
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Create and return a File object
    return new File([byteArray], fileName, { type: type || "application/pdf" });
}
