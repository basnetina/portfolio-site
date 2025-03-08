"use client"

import {use, useEffect, useState} from 'react'
import {Content, generateHTML} from '@tiptap/react'
import { MinimalTiptapEditor } from '@/components/minimal-tiptap'
import {CheckIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import { useFetchSingleBlogQuery, useUpdateBlogMutation} from "@/store/features/blogs";
import {useCustomToast} from "@/hooks/useCustomToast";
import CustomLoadingBtn from "@/components/custom-ui/loading/CustomLoadingBtn";
import {revalidateBlogs} from "@/app/actions";


const UpdateBlogPage = ({params}:{params: Promise<{id: string}>}) => {
    const id = use(params)?.id
    const {data: blog} = useFetchSingleBlogQuery(id)
    const [value, setValue] = useState<Content>("")
    const [title, setTitle] = useState('')
    const [updateBlog, {isLoading: isLoadingUpdate, data: dataUpdate}] = useUpdateBlogMutation()

    const handlePublishBlog = async () => {
        updateBlog({
            title,
            content: value?.toString(),
            id
        })

        await revalidateBlogs()
    }

    useEffect(() => {
        if (blog) {
            setTitle(blog?.title || '');
        }
        if (blog && blog.content && !value) {
            setValue(blog.content);
        }
    }, [blog]);


    useCustomToast({
        data:dataUpdate,
        successFn: () => {
            setTitle('');
            setValue('');
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
            {value && <MinimalTiptapEditor
                value={value}
                onChange={setValue}
                className="w-full"
                editorContentClassName="p-5"
                output="html"
                placeholder="Write your blogs..."
                autofocus={true}
                editable={true}
                editorClassName="focus:outline-none"
            />}

            {!value && <MinimalTiptapEditor
                value={""}
                onChange={setValue}
                className="w-full"
                editorContentClassName="p-5"
                output="html"
                placeholder="Write your blogs..."
                autofocus={true}
                editable={true}
                editorClassName="focus:outline-none"
            />}

            <div className={'flex justify-end mt-4'}>
                {isLoadingUpdate ? <CustomLoadingBtn /> : <Button disabled={!blog?.content} onClick={handlePublishBlog}>
                    Update Blog
                    <CheckIcon className="ml-2"/>
                </Button>}
            </div>

        </>
    )
}
export default UpdateBlogPage