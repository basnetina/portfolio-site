import CustomLoadingBtn from "@/components/custom-ui/loading/CustomLoadingBtn";
import {LandingType} from "@/types/landingType";
import {useEffect, useState} from "react";
import {getBase64} from "@/utils/getBase64";
import {useForm} from "react-hook-form";
import {
    useAddLandingPageMutation,
    useFetchLandingPageQuery,
    useUpdateLandingPageMutation
} from "@/store/features/cms/landing";
import {useCustomToast} from "@/hooks/useCustomToast";
import {useSession} from "next-auth/react";
import {revalidateLanding} from "@/app/actions";

interface FormData {
    full_name: string
    email: string
    address: string
    about_me: string,
    animation_texts: string
}

const ProfileUpdateForm = () => {
    const [bannerPreview, setBannerPreview] = useState<string>("")
    const [profilePicPreview, setProfilePicPreview] = useState<string>("")
    const [profileBase64, setProfileBase64] = useState<string | unknown>("")
    const [bannerBase64, setBannerBase64] = useState<string | unknown>("")
    const [addLanding, {isLoading, data: AddData}] = useAddLandingPageMutation()
    const [updateLanding, {isLoading:isLoadingUpdate, data:updateData}] = useUpdateLandingPageMutation()
    const {data: session} = useSession()

    const {data: landingData, isLoading: isLoadingGet} = useFetchLandingPageQuery({
        email: session?.user?.email
    })


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        watch,
    } = useForm<FormData>({
        defaultValues: {
            full_name: "",
            email: "",
            address: "",
            about_me: "",
        },
    })


    const handleBannerChange =async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const banner64 = await getBase64(file)
            setBannerBase64(banner64)
            const reader = new FileReader()
            reader.onloadend = () => {
                setBannerPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleProfilePicChange =async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            const profile64 = await getBase64(file)
            setProfileBase64(profile64)
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfilePicPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    useEffect(() => {
        reset({
            ...landingData
        })
        setProfileBase64(landingData?.profile_pic)
        setBannerBase64(landingData?.banner_image)
        setBannerPreview(landingData?.banner_image)
        setProfilePicPreview(landingData?.profile_pic)
    }, [landingData]);

    const onSubmit = async (data: FormData) => {
        try {

            const formData: LandingType = {
                banner_image: bannerBase64,
                profile_pic: profileBase64,
                full_name: data?.full_name,
                email: data?.email,
                address: data?.address,
                about_me: data?.about_me,
                animation_texts: data?.animation_texts
            }

            if(landingData === null){
                addLanding(formData)
            } else {
                updateLanding({
                    ...formData,
                    id: landingData?.id
                })
            }
            await revalidateLanding()
        } catch (error) {
            console.error("Error converting images:", error)
        }
    }

    useCustomToast({
        data: AddData
    })
    useCustomToast({
        data: updateData
    })



    return (
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6">
                {/* Banner Section */}
                <div className="flex flex-col gap-4 items-center">
                    <div className="flex items-center gap-6">
                        <label
                            htmlFor="banner"
                            className="bg-green-600 text-white px-2 md:px-4 py-0 md:py-1 rounded-md shadow hover:bg-green-700 cursor-pointer"
                        >
                            Choose Banner
                        </label>
                        <input
                            id={'banner'}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleBannerChange}
                        />
                        {isLoadingGet ? <div>
                                <div
                                    className="skeleton h-28 md:h-36 w-20 md:w-[38rem] rounded-md shadow bg-gray-200 animate-pulse"></div>
                            </div> :
                            <img
                                src={bannerPreview || "https://placehold.co/600x400"}
                                alt="portfolio page"
                                className="w-20 md:w-[38rem] h-28 md:h-36 object-cover rounded-md shadow"
                            />
                        }
                    </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                    <h3 className="text-xl font-bold text-gray-700">Change Profile Picture</h3>
                    <div className="relative group">
                        <img
                            src={profilePicPreview || "https://avatar.iran.liara.run/public"}
                            alt="profile picture"
                            className="w-24 h-24 rounded-full object-cover shadow-md border-4 border-gray-200"
                        />
                        <label
                            htmlFor="profile-pic"
                            className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full"
                        >
                            Change
                        </label>
                        <input
                            type="file"
                            id="profile-pic"
                            accept="image/*"
                            className="hidden"
                            onChange={handleProfilePicChange}
                        />
                    </div>
                </div>

                {/* Details Section */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Details</h3>
                    <div className="space-y-4">
                        {/* Name Input */}
                        <div className="grid grid-cols-1 md:grid-cols-2 space-y-2 md:space-y-0 md:space-x-3">
                            <div className="flex flex-col">
                                <label htmlFor="name" className="text-gray-600 mb-2">
                                    Name
                                </label>
                                <input
                                    id="full_name"
                                    type="text"
                                    placeholder={"Enter your name"}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 outline-none"
                                    {...register("full_name", {required: "Name is required"})}
                                />
                                {errors.full_name &&
                                    <span className="text-red-500 text-sm">{errors.full_name.message}</span>}
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="email" className="text-gray-600 mb-2">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 outline-none"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address",
                                        },
                                    })}
                                />
                                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                            </div>
                        </div>

                        {/* Address Input */}
                        <div className="flex flex-col">
                            <label htmlFor="address" className="text-gray-600 mb-2">
                                Address
                            </label>
                            <input
                                id="address"
                                type="text"
                                placeholder="Enter your address"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 outline-none"
                                {...register("address", {required: "Address is required"})}
                            />
                            {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="animation_texts" className="text-gray-600 mb-2">
                                Animated Texts (separate with comma , )
                            </label>
                            <textarea
                                id="animation_texts"
                                placeholder="Animated Texts (separate with comma ,)"
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 outline-none"
                                {...register("animation_texts")}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="about" className="text-gray-600 mb-2">
                                About Me
                            </label>
                            <textarea
                                id="about_me"
                                placeholder="Enter about yourself"
                                rows={5}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 outline-none"
                                {...register("about_me")}
                            />
                        </div>
                    </div>
                </div>

                {/* Save Changes Button */}
                <div className="flex justify-end">
                    {(isLoading || isLoadingUpdate) ? <CustomLoadingBtn/> : <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Save Changes
                    </button>}
                </div>
            </form>
    )
}

export default ProfileUpdateForm