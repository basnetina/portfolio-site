"use client"

import { useState } from 'react'
import { Content } from '@tiptap/react'
import { MinimalTiptapEditor } from '@/components/minimal-tiptap'
import {CheckIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useAddBlogMutation} from "@/store/features/blogs";
import {useCustomToast} from "@/hooks/useCustomToast";
import CustomLoadingBtn from "@/components/custom-ui/loading/CustomLoadingBtn";
import {useRouter} from "next/navigation";
import {revalidateBlogs} from "@/app/actions";

const AddBlogsPage = () => {
    const [value, setValue] = useState<Content>('')
    const [title, setTitle] = useState('')
    const [addBlog, {isLoading: isLoadingAdd, data: dataAdd}] = useAddBlogMutation()
    const router = useRouter()

    const handlePublishBlog = async () => {
        addBlog({
            title,
            content: value?.toString(),
        })

        await revalidateBlogs()

    }

    useCustomToast({
        data:dataAdd,
        successFn: () => {
            setTitle('');
            setValue('');
            router.push('/admin/blogs')
        }
    })

    return (
        <>
            <Input
                className="w-full mb-4"
                placeholder="Enter blog title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <MinimalTiptapEditor
                value={value}
                onChange={setValue}
                className="w-full"
                editorContentClassName="p-5"
                output="html"
                placeholder="Write your blogs..."
                autofocus={true}
                editable={true}
                editorClassName="focus:outline-none"
            />

            <div className={'flex justify-end mt-4'}>
                {isLoadingAdd ? <CustomLoadingBtn /> : <Button onClick={handlePublishBlog}>
                    Publish Blog
                    <CheckIcon className="ml-2"/>
                </Button>}
            </div>

        </>
    )
}
export default AddBlogsPage