"use client"
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PlusCircle, TrashIcon } from "lucide-react";
import { Icon } from "@iconify/react";
import {
    useAddSocialLinksMutation,
    useFetchSocialLinksQuery,
    useUpdateSocialLinksMutation
} from "@/store/features/cms/social";
import {SocialType} from "@/types/socialType";
import {useCustomToast} from "@/hooks/useCustomToast";
import {useEffect} from "react";
import {socialOptions} from "@/lib/socialIconData";
import {revalidateSocial} from "@/app/actions";

type FormValues = {
    socialLinks: SocialType[];
};

const schema = yup.object().shape({
    socialLinks: yup
        .array()
        .of(
            yup.object().shape({
                platform: yup.string().required("Platform is required"),
                label: yup.string().required("Label is required"),
                url: yup.string().url("Enter a valid URL").required("URL is required"),
            })
        )
        .min(1, "At least one social link is required"),
});



export default function SocialLinksUpdateForm() {
    const [updateSocial, { isLoading: isLoadingUpdate, data: updateData }] = useUpdateSocialLinksMutation();
    const [addSocial, { isLoading: isLoadingAdd, data: addData }] = useAddSocialLinksMutation();
    const { data: getSocialLinksData, isLoading: isLoadingGet } = useFetchSocialLinksQuery(process.env.NEXT_PUBLIC_MY_EMAIL);

    const { register,reset,  handleSubmit, control, watch, formState: { errors } } = useForm<FormValues>({
        // @ts-ignore
        resolver: yupResolver(schema),
        defaultValues: { socialLinks: [] },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "socialLinks",
    });

    const onSubmit: SubmitHandler<FormValues> = async  (data) => {
        console.log("Updated Social Links:", data);
        if(getSocialLinksData === null){
            addSocial(data);
        } else {
            updateSocial({
                ...data,
                id: getSocialLinksData?.id
            })
        }
        await revalidateSocial()
    };

    useCustomToast({
        data: updateData
    })
    useCustomToast({
        data: addData
    })

    useEffect(() => {
        reset({
            socialLinks: getSocialLinksData?.socialLinks
        })
    }, [getSocialLinksData]);



    return (
        <div className="flex justify-center w-full items-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                    Manage Social Links
                </h2>

                {isLoadingGet && Array.from("aan").map((item, index) =>  <div key={index} className={'grid grid-cols-3 mb-2 space-x-2'}>
                    <div className={'h-10 bg-gray-200 skeleton animate-pulse'}/>
                    <div className={'h-10 bg-gray-200 skeleton animate-pulse'}/>
                    <div className={'h-10 bg-gray-200 skeleton animate-pulse'}/>
                </div> )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {fields.map((field, index) => {
                        const selectedPlatform = watch(`socialLinks.${index}.platform`);
                        const selectedIcon =
                            socialOptions.find((opt) => opt.id === selectedPlatform)?.icon || null;

                        return (
                            <div key={field.id} className="bg-gray-100 p-4 rounded-lg">
                                <div className="flex items-center space-x-2">
                                    {/* Social Media Dropdown with Icon */}
                                    <div className="relative w-1/3">
                                        <select
                                            {...register(`socialLinks.${index}.platform`)}
                                            className="w-full px-3 py-2 border rounded-lg outline-none appearance-none"
                                        >
                                            <option value="">Select</option>
                                            {socialOptions.map((option) => (
                                                <option key={option.id} value={option.id}>
                                                    {option.name}
                                                </option>
                                            ))}
                                        </select>
                                        {selectedIcon && (
                                            <div className="absolute right-2 top-2 text-gray-500">
                                                <Icon icon={selectedIcon} className="w-5 h-5" />
                                            </div>
                                        )}
                                        {errors.socialLinks?.[index]?.platform && <p className="text-red-500">{errors.socialLinks[index]?.platform?.message}</p>}
                                    </div>

                                    {/* Label Input */}
                                    <div className="w-1/3">
                                        <input
                                            {...register(`socialLinks.${index}.label`)}
                                            type="text"
                                            placeholder="Label"
                                            className="w-full px-3 py-2 border rounded-lg outline-none"
                                        />
                                        {errors.socialLinks?.[index]?.label && <p className="text-red-500">{errors.socialLinks[index]?.label?.message}</p>}
                                    </div>

                                    {/* URL Input */}
                                    <div className="w-1/3">
                                        <input
                                            {...register(`socialLinks.${index}.url`)}
                                            type="url"
                                            placeholder="URL"
                                            className="w-full px-3 py-2 border rounded-lg outline-none"
                                        />
                                        {errors.socialLinks?.[index]?.url && <p className="text-red-500">{errors.socialLinks[index]?.url?.message}</p>}
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <TrashIcon />
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    {/* Add More Links */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => append({ platform: "", label: "", url: "" })}
                            className="px-4 flex items-center justify-center bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            <PlusCircle className="mr-2" /> Add Social Link
                        </button>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-green-500 px-4 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition"
                        >
                            Save Links
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
