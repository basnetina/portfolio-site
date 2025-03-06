import {createApi} from "@reduxjs/toolkit/query/react"
import {baseQuery} from "@/store/features/baseQuery";

const blogAPI = createApi({
    reducerPath: 'blogAPI',
    baseQuery: baseQuery,
    tagTypes: ['blogAPI'],
    endpoints: (builder) => ({
        fetchBlogs: builder.query({
            query: (data) => ({
                url: `/blogs?email=${data?.email}`,
                method: 'GET'
            }),
            providesTags: ['blogAPI'],
            transformResponse: (response: any ) => response?.blogs || null
        }),
        fetchSingleBlog: builder.query({
            query: (id) => ({
                url: `/blogs/${id}`,
                method: 'GET'
            }),
            providesTags: ['blogAPI'],
            transformResponse: (response: any ) => response.data || null
        }),
        fetchBlogsServer: builder.query({
           query: (email) => ({
               url: `/blogs/server?email=${email}`,
               method: 'GET'
           }),
            providesTags: ['blogAPI'],
            transformResponse: (response: any ) => response?.blogs || null
        }),
        addBlog: builder.mutation({
            query: (data) => ({
                url: '/blogs',
                method: 'POST',
                body: JSON.stringify(data)
            }),
            invalidatesTags: ['blogAPI'],

        }),
        updateBlog: builder.mutation({
            query: (data) => ({
                url: `/blogs/${data?.id}`,
                method: 'PATCH',
                body: JSON.stringify(data)
            }),
            invalidatesTags: ['blogAPI'],
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/blogs/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['blogAPI'],
        })
    })
})

export const {
    useFetchBlogsQuery,
    useFetchSingleBlogQuery,
    useAddBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
    useFetchBlogsServerQuery
} = blogAPI

export default blogAPI