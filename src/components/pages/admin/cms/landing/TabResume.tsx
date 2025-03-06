"use client"

import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { useAddResumeMutation, useFetchResumeQuery } from "@/store/features/cms/resume"
import { useCustomToast } from "@/hooks/useCustomToast"
import { fetchPublicResume } from "@/utils/fetchPublicResume"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';

const TabResume = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [addResume, { isLoading: isLoadingAdd, data: AddData, error: addError }] = useAddResumeMutation()
    const { data, isLoading: isLoadingGet, error: getError } = useFetchResumeQuery(undefined)
    const [pdfUrl, setPdfUrl] = useState<string | null>(null)

    const handleFetchResume = () => {
        fetchPublicResume()
            .then((res) => {
                if (res) {
                    setSelectedFile(res)
                    setPdfUrl(URL.createObjectURL(res))
                    setError(null)
                } else {
                    setError("No resume found")
                }
            })
            .catch((error) => {
                setError("Error fetching resume")
            })
    }

    useEffect(() => {
        try {
            handleFetchResume()
        } catch (error) {
            console.error("Error fetching resume:", error)
        }
    }, [])

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        if (file?.size > 1000000) {
            setError("File size exceeds 1MB")
            return
        }
        if (file?.type === "application/pdf") {
            setSelectedFile(file)
            setPdfUrl(URL.createObjectURL(file))
            setError(null)
        } else {
            setError("Please upload a PDF file")
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [".pdf"],
        },
        multiple: false,
    })

    const removeFile = () => {
        setSelectedFile(null)
        setPdfUrl(null)
        setError(null)
    }

    const handleSaveChanges = async () => {
        if (!selectedFile) {
            setError("Please upload a PDF file")
            return
        }

        const formData = new FormData()
        formData.append("file", selectedFile)

        await addResume(formData)

        setSelectedFile(null)
        setPdfUrl(null)
        setError(null)
    }

    useCustomToast({
        data: AddData,
        successFn: () => {
            try {
                handleFetchResume()
            } catch (error) {
                console.error("Error fetching resume:", error)
            }
        },
    })


    return (
        <div className="w-full mx-auto p-6 bg-white">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload Resume</h2>
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"}
          ${error ? "border-red-500 bg-red-50" : ""}
        `}
            >
                <input {...getInputProps()} />

                <div className="space-y-4">
                    <div className="flex justify-center">
                        <svg
                            className={`w-12 h-12 ${error ? "text-red-500" : "text-gray-400"}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>
                    </div>

                    {selectedFile ? (
                        <div className="text-gray-600">
                            <p className="font-medium">{selectedFile.name}</p>
                            <button
                                type="button"
                                onClick={removeFile}
                                className="mt-2 text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                                Remove File
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="text-gray-600">
                                {isDragActive ? (
                                    <span>Drop your resume here...</span>
                                ) : (
                                    <span>
                    Drag and drop your resume here, or{" "}
                                        <span className="text-blue-600 hover:text-blue-700 font-medium">click to browse</span>
                  </span>
                                )}
                            </div>
                            <p className="text-sm text-gray-500 mt-2">PDF only (Max size: 1MB)</p>
                        </div>
                    )}

                    {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                </div>
            </div>

            <div className="mt-4 flex justify-end">
                <button
                    onClick={handleSaveChanges}
                    className="bg-blue-950 text-white rounded p-2 hover:bg-blue-900"
                    disabled={isLoadingAdd}
                >
                    Save Changes
                </button>
            </div>


            {pdfUrl && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Resume Preview</h3>
                    <div className="border rounded-lg p-4">

                        <div
                            style={{
                                border: '1px solid rgba(0, 0, 0, 0.3)',
                                height: '70vh',
                                overflow: 'auto',
                            }}
                        >
                            <Worker workerUrl={'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'}>
                                <Viewer
                                    fileUrl={pdfUrl}
                                />
                            </Worker>
                        </div>


                    </div>
                </div>
            )}
        </div>
    )
}

export default TabResume

