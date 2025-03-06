"use client"
import {
    useDeleteEducationMutation,
    useFetchEducationQuery,
    useUpdateEducationMutation
} from "@/store/features/education";
import {EducationType, EducationTypeEdit} from "@/types/EducationType";
import EducationItemAdmin from "@/components/pages/admin/education/EducationItemAdmin";
import {useState} from "react";
import CustomConfirmationDialog from "@/components/custom-ui/dialog/CustomConfirmationDialog";
import {useCustomToast} from "@/hooks/useCustomToast";
import EducationForm from "@/components/pages/admin/education/FormEducation";
import {useRouter} from "next/navigation";
import LoadingSpinner from "@/components/custom-ui/loading/LoadingSpinner";

const EducationListPage = () => {
    const {data: educations, isLoading} = useFetchEducationQuery({
        email:process.env.NEXT_PUBLIC_MY_EMAIL
    })
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const [updateEducation, {isLoading: isLoadingUpdate, data: dataUpdate}] = useUpdateEducationMutation()
    const [deleteEducation, {isLoading: isLoadingDelete, data: dataDelete}] = useDeleteEducationMutation()
    const [editingId, setEditingId] = useState<string | null>(null)
    const [deleteId, setDeleteId] = useState<string | null>(null)

    const router = useRouter()

    const handleUpdate= (education: EducationType) => {
        updateEducation(education)
    }

    const handleDelete= (education: EducationTypeEdit | null) => {
        if(!showDeleteConfirmation){
           setShowDeleteConfirmation(true)
        } else {
            deleteEducation(education?.id)
            setShowDeleteConfirmation(false)
        }
    }

    useCustomToast({
        data: dataUpdate,
        successFn: () => {
           setEditingId(null)
        }
    })

    return(
        <>
            <CustomConfirmationDialog
                isOpen={showDeleteConfirmation}
                onConfirm={()=> {
                    deleteEducation(deleteId);
                    setDeleteId(null);
                    setShowDeleteConfirmation(false);
                }}
                onCancel={()=> setShowDeleteConfirmation(false)}
                title={'Confirmation Dialog'}
                message={'Are you sure you want to delete this item ?'}
                isLoading={isLoadingDelete}
            />
            <h1 className="text-2xl font-bold mb-4">Education List</h1>
            <div className="mt-8">

                {isLoading && (
                    <LoadingSpinner />
                )

                }
                {educations?.map?.((education: EducationTypeEdit) => (
                    <div key={education.id}>
                        {editingId === education.id ? (
                                <EducationForm isLoading={isLoadingUpdate} education={education} onSubmit={(edu: EducationType)=>handleUpdate(edu)} onCancel={() => setEditingId(null)} />
                            ) :
                       ( <EducationItemAdmin
                            education={education}
                            onDelete={() => {
                                setShowDeleteConfirmation(true);
                                setDeleteId(education?.id);
                            }}
                            onEdit={() => setEditingId(education.id)}
                        />)
                        }
                    </div>
                ))}
            </div>
        </>
    )
}

export default EducationListPage