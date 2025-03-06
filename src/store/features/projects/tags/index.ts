import {createApi} from "@reduxjs/toolkit/query/react"
import {baseQuery} from "@/store/features/baseQuery";

const projectsTagAPI = createApi({
    reducerPath: 'projectsTagAPI',
    baseQuery: baseQuery,
    tagTypes: ['projectsTagAPI'],
    endpoints: (builder) => ({

        fetchProjectTags: builder.query({
            query: (email) => ({
                url: `/projects/tags?email=${email}`,
                method: 'GET'
            }),
            providesTags: ['projectsTagAPI'],
            transformResponse: (response: any ) => response.tags || null
        }),
        addProjectTag: builder.mutation({
            query: (data) => ({
                url: '/projects/tags',
                method: 'POST',
                body: JSON.stringify(data)
            }),
            invalidatesTags: ['projectsTagAPI'],

        }),
        updateProjectTag: builder.mutation({
            query: (data) => ({
                url: `/projects/tags/${data?.id}`,
                method: 'PATCH',
                body: JSON.stringify(data)
            }),
            invalidatesTags: ['projectsTagAPI'],

        }),
        deleteProjectTag: builder.mutation({
            query: (id) => ({
                url: `/projects/tags/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['projectsTagAPI'],
        })
    })
})

export const {
    useFetchProjectTagsQuery,
    useAddProjectTagMutation,
    useUpdateProjectTagMutation,
    useDeleteProjectTagMutation
} = projectsTagAPI

export default projectsTagAPI