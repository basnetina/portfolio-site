"use client"


import FormEducation from "@/components/pages/admin/education/FormEducation";
import {useAddEducationMutation} from "@/store/features/education";
import {useCustomToast} from "@/hooks/useCustomToast";
import {useRouter} from "next/navigation";

const AddEducationPage = () => {
    const [addEducation, {data, isLoading}] = useAddEducationMutation()
    const router = useRouter()

    const handleSubmit = (data: any) => {
        console.log(data)
        addEducation(data)
    }

    useCustomToast({
        data,
        successFn: ()=>{
            router.push("/admin/education")
        }

    })

    return (
        <>
            <h1 className={'text-2xl'}>Add Education</h1>
            <FormEducation
                onSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </>
    )
}

export default AddEducationPage