import {createApi} from "@reduxjs/toolkit/query/react"
import {baseQuery} from "@/store/features/baseQuery";

const educationAPI = createApi({
    reducerPath: 'educationAPI',
    baseQuery: baseQuery,
    tagTypes: ['education'],
    endpoints: (builder) => ({
        fetchEducation: builder.query({
            query: (data) => ({
                url: `/education?email=${data?.email}`,
                method: 'GET'
            }),
            providesTags: ['education'],
            transformResponse: (response: any ) => response?.education || null
        }),
        fetchSingleEducation: builder.query({
            query: (id) => ({
                url: `/education/${id}`,
                method: 'GET'
            }),
            providesTags: ['education'],
            transformResponse: (response: any ) => response.data || null
        }),
        addEducation: builder.mutation({
            query: (data) => ({
                url: '/education',
                method: 'POST',
                body: JSON.stringify(data)
            }),
            invalidatesTags: ['education'],

        }),
        updateEducation: builder.mutation({
            query: (data) => ({
                url: `/education/${data?.id}`,
                method: 'PATCH',
                body: JSON.stringify(data)
            }),
            invalidatesTags: ['education'],
        }),
        deleteEducation: builder.mutation({
            query: (id) => ({
                url: `/education/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['education'],
        })
    })
})

export const {
    useAddEducationMutation,
    useFetchEducationQuery,
    useUpdateEducationMutation,
    useDeleteEducationMutation,
    useFetchSingleEducationQuery
} = educationAPI

export default educationAPI