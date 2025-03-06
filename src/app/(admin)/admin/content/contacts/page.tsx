"use client"

import {useForm} from "react-hook-form";
import {
    useAddCMSContactMutation,
    useFetchCMSContactQuery,
    useUpdateCMSContactMutation
} from "@/store/features/cms/contact";
import {useCustomToast} from "@/hooks/useCustomToast";
import CustomLoadingBtn from "@/components/custom-ui/loading/CustomLoadingBtn";
import {useEffect} from "react";

const ContactCMSPage =() => {
    const [addContactInfo, {data, isLoading}] = useAddCMSContactMutation()
    const [updateContactInfo, {data: dataUpdate, isLoading: isLoadingUpdate}] = useUpdateCMSContactMutation()

    const {data: contactCMS, isLoading:isLoadingGet} = useFetchCMSContactQuery(process.env.NEXT_PUBLIC_MY_EMAIL)

    const {
        register,
        reset,
        handleSubmit
    } = useForm({
        defaultValues: {
            primaryLabel: '',
            secondaryLabel: '',
            email: '',
            phone: '',
            address: '',
        }
    })

    useEffect(() => {
        if(contactCMS){
            reset(contactCMS)
        }
    }, [contactCMS])

    const onSubmit = (data: any) => {
        if(contactCMS === null){
            addContactInfo(data)
        } else {
            updateContactInfo({
                id: contactCMS.id,
               ...data
            })
        }
    }

    useCustomToast({
        data,
        successFn: () => {
            reset({
                primaryLabel: '',
                secondaryLabel: '',
                email: '',
                phone: '',
                address: '',
            })
        }
    })

    useCustomToast({
        data: dataUpdate
    })

    return (
        <>
            <div className={'w-full m-3'}>
                <div className={'bg-white p-4 rounded'}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1 className={'text-2xl font-bold text-center'}>Manage Your Contact Page</h1>
                        <div className={'grid'}>
                            <div className={'grid grid-cols-2 mt-4 gap-4'}>
                                <div className="space-y-2">
                                    <label htmlFor="primaryLabel" className="text-sm font-medium text-gray-700">
                                        Primary Label
                                    </label>
                                    <input
                                        {...register('primaryLabel')}
                                        id={'primaryLabel'}
                                        type={'text'}
                                        placeholder={'Primary Label'}
                                        className={'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="secondaryLabel" className="text-sm font-medium text-gray-700">
                                        Secondary Label
                                    </label>
                                    <input
                                        {...register('secondaryLabel')}
                                        type={'text'}
                                        id={"secondaryLabel"}
                                        placeholder={'Secondary Label'}
                                        className={'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'}
                                    />
                                </div>
                            </div>

                            <div className={'grid grid-cols-3 mt-4 gap-4'}>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        {...register('email')}
                                        type={'email'}
                                        placeholder={'Email'}
                                        className={'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                                        Phone
                                    </label>
                                    <input
                                        {...register('phone')}
                                        type={'text'}
                                        id={"phone"}
                                        placeholder={'Phone'}
                                        className={'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'}
                                    />                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="address" className="text-sm font-medium text-gray-700">
                                        Address
                                    </label>

                                    <input
                                        id={"address"}
                                        {...register('address')}
                                        type={'text'}
                                        placeholder={'Address'}
                                        className={'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'}
                                    />
                                </div>

                            </div>

                        </div>

                        <div className={'mt-4 flex justify-end'}>
                            {(isLoading || isLoadingUpdate) ? <CustomLoadingBtn /> : <button type={'submit'}
                                     className={'bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 text-md rounded'}>
                                {contactCMS === null ? "Save" : "Update"} Changes
                            </button>}
                        </div>

                    </form>
                </div>

            </div>
        </>
    )
}

export default ContactCMSPage