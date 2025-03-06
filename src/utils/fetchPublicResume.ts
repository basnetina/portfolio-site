
export async function fetchPublicResume() {
    try {
        // Replace 'example.pdf' with the path to your file in the public folder
        const response = await fetch('/resume.pdf');

        if (!response.ok) {
            return null
        }

        // Convert the response to a Blob
        const blob = await response.blob();

        // Optionally, convert the Blob to a File object
        const file = new File([blob], 'resume.pdf', { type: blob.type });

        console.log('File object:', file);
        return file;
    } catch (error) {
        console.error('Error fetching the file:', error);
    }
}
