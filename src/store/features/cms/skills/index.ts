import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {baseQuery} from "@/store/features/baseQuery";

const skillAPI = createApi({
    reducerPath: 'skillAPI',
    baseQuery: baseQuery,
    tagTypes: ['SKILL'],
    endpoints: (builder) => ({
        fetchSkills: builder.query({
            query: (email) => ({
                url: `/cms/skills?email=${email}`,
                method: 'GET'
            }),
            providesTags: ['SKILL'],
            transformResponse: (response: any ) => response.cms_skills || null
        }),
        addSkill: builder.mutation({
            query: (data) => ({
                url: '/cms/skills',
                method: 'POST',
                body: JSON.stringify(data)
            }),
            invalidatesTags: ['SKILL'],

        }),
        updateSkill: builder.mutation({
            query: (data) => ({
                url: `/cms/skills/${data?.id}`,
                method: 'PATCH',
                body: JSON.stringify(data)
            }),
            invalidatesTags: ['SKILL'],
        }),
        deleteSkill: builder.mutation({
            query: (id) => ({
                url: `/cms/skills/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['SKILL'],
        })
    })
})

export const {
    useFetchSkillsQuery,
    useUpdateSkillMutation,
    useAddSkillMutation,
    useDeleteSkillMutation
} = skillAPI

export default skillAPI
