import {createApi} from "@reduxjs/toolkit/query/react"
import {baseQuery} from "@/store/features/baseQuery";

const projectsAPI = createApi({
    reducerPath: 'projectsAPI',
    baseQuery: baseQuery,
    tagTypes: ['projectsAPI'],
    endpoints: (builder) => ({
        fetchProjects: builder.query({
            query: (email) => ({
                url: `/projects?email=${email}`,
                method: 'GET'
            }),
            providesTags: ['projectsAPI'],
            transformResponse: (response: any ) => response.projects || null
        }),
        fetchLimitedProjects: builder.query({
           query:(limit ) => ({
                   url: `/projects?email=${process.env.NEXT_PUBLIC_MY_EMAIL}&limit=${limit}`,
                   method: 'GET'
               }),
            providesTags: ['projectsAPI'],
            transformResponse: (response: any ) => response.projects || null
        }),
        fetchSingleProject: builder.query({
            query: (id) => ({
                url: `/projects/${id}`,
                method: 'GET'
            }),
            providesTags: ['projectsAPI'],
            transformResponse: (response: any ) => response.data || null
        }),
        addProject: builder.mutation({
            query: (data) => ({
                url: '/projects',
                method: 'POST',
                body: JSON.stringify(data)
            }),
            invalidatesTags: ['projectsAPI'],

        }),
        updateProject: builder.mutation({
            query: (data) => ({
                url: `/projects/${data?.id}`,
                method: 'PATCH',
                body: JSON.stringify(data)
            }),
            invalidatesTags: ['projectsAPI'],

        }),
        deleteProject: builder.mutation({
            query: (id) => ({
                url: `/projects/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['projectsAPI'],
        })
    })
})

export const {
    useAddProjectMutation,
    useFetchProjectsQuery,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
    useFetchSingleProjectQuery,
    useFetchLimitedProjectsQuery
} = projectsAPI

export default projectsAPI