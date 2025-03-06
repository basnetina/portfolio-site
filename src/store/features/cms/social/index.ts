import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {baseQuery} from "@/store/features/baseQuery";

const socialAPI = createApi({
    reducerPath: 'socialAPI',
    baseQuery: baseQuery,
    tagTypes: ['SOCIAL'],
    endpoints: (builder) => ({
        fetchSocialLinks: builder.query({
            query: (email) => ({
                url: `/cms/social?email=${email}`,
                method: 'GET'
            }),
            providesTags: ['SOCIAL'],
            transformResponse: (response: any ) => response.cms_social?.[0] || null
        }),
        addSocialLinks: builder.mutation({
            query: (data) => ({
                url: '/cms/social',
                method: 'POST',
                body: JSON.stringify(data)
            }),
            invalidatesTags: ['SOCIAL'],

        }),
        updateSocialLinks: builder.mutation({
            query: (data) => ({
                url: `/cms/social/${data?.id}`,
                method: 'PATCH',
                body: JSON.stringify(data)
            }),
            invalidatesTags: ['SOCIAL'],

        })
    })
})

export const {
    useAddSocialLinksMutation,
    useFetchSocialLinksQuery,
    useUpdateSocialLinksMutation
} = socialAPI

export default socialAPI