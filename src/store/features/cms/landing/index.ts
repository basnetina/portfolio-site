import {createApi} from "@reduxjs/toolkit/query/react"
import {baseQuery} from "@/store/features/baseQuery";
import { LandingType} from "@/types/landingType";

const landingAPI = createApi({
    reducerPath: 'landingAPI',
    baseQuery: baseQuery,
    tagTypes: ['landing'],
    endpoints: (builder) => ({
        fetchLandingPage: builder.query({
            query: (data) => ({
                url: `/cms/landing?email=${data?.email}`,
                method: 'GET'
            }),
            transformResponse: (response: any ) => response.cms_landing?.[0] || null,
            providesTags: ['landing']
        }),
        addLandingPage: builder.mutation({
            query: (data: LandingType) => ({
                url: '/cms/landing',
                method: 'POST',
                body: JSON.stringify(data)
            }),
            invalidatesTags: ['landing']
        }),
        updateLandingPage: builder.mutation({
            query: (data) => ({
                url: `/cms/landing/${data.id}`,
                method: 'PATCH',
                body: JSON.stringify(data)
            }),
            invalidatesTags: ['landing']
        })
    })
})

export const {
    useFetchLandingPageQuery,
    useAddLandingPageMutation,
    useUpdateLandingPageMutation
} = landingAPI

export default landingAPI