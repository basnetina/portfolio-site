import React, {useEffect, useState} from "react";
import { useForm, Controller } from "react-hook-form";
import CustomLoadingBtn from "@/components/custom-ui/loading/CustomLoadingBtn";
import {getBase64} from "@/utils/getBase64";
import {BlogGet} from "@/types/BlogType";
import {Button} from "@/components/ui/button";
import {getFileFromBase64Pdf} from "@/utils/getFileFromBase64Pdf";

const FormUpdateBlogDetails = ({
    handleBlogUpdate, isLoading, blog, handleClose
                               }: {
    handleBlogUpdate: (data: any) => void,
    isLoading: boolean,
    blog: BlogGet | null,
    handleClose: () => void
}) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: { subtitle: blog?.subtitle || ""},
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    useEffect(()=>{
        if(blog?.thumbnail){
            const separate = blog?.thumbnail.split(';')?.[0]
            const separate1 = separate.split(':')?.[1]
            setSelectedFile(getFileFromBase64Pdf(blog?.thumbnail, `${blog?.title}.jpg`, separate1))
        }
    },[])

    const onSubmit = async (data: any) => {
       let base64Image;
        if(selectedFile){
            base64Image = await getBase64(selectedFile)
       }

        handleBlogUpdate({
            ...data,
            thumbnail: base64Image
        })
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]

            if (file.size > 1048576) {
                alert("Image size must be less than 1MB")
                return
            }

            if( (!file.type.match('image.*'))){
                alert("Please select an image file")
                return
            }

            setSelectedFile(e.target.files[0])
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Subtitle Input */}
            <div className="mb-4">
                <label htmlFor="subtitle" className="block text-gray-700 text-sm font-bold mb-2">
                    SubTitle
                </label>
                <input
                    type="text"
                    id="subtitle"
                    {...register("subtitle", { required: "Subtitle is required" })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.subtitle && (
                    <p className="text-red-500 text-xs italic">{errors?.subtitle?.message}</p>
                )}
            </div>

            {/* Thumbnail Image Input */}
            <div className={`mb-4 ${blog?.thumbnail ? 'flex justify-between gap-4': ''} `}>
                <div>
                    <div className={'flex gap-1'}>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                            Thumbnail
                        </label>
                        <span style={{ color: 'red', fontSize: 12}}>*</span>
                    </div>
                    <input
                        onChange={handleFileChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="image"
                        type="file"
                        accept="image/*"
                    />
                    {selectedFile && <p className="text-sm mt-1">Selected file: {selectedFile.name}</p>}
                </div>

                {blog?.thumbnail && <div>
                    <img alt={blog?.title} src={blog?.thumbnail} height={200} width={300}/>
                </div>}
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end gap-4">
               <Button
                   onClick={handleClose}
                   variant={'destructive'}>
                   Close
               </Button>


                {isLoading ? <CustomLoadingBtn /> : <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Update Blog
                </button>}


            </div>
        </form>
    );
};

export default FormUpdateBlogDetails;