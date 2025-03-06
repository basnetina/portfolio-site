import {createApi} from "@reduxjs/toolkit/query/react"
import {baseQuery} from "@/store/features/baseQuery";
import { LandingType} from "@/types/landingType";

const contactCMSAPI = createApi({
    reducerPath: 'contactCMSAPI',
    baseQuery: baseQuery,
    tagTypes: ['contactCMSAPI'],
    endpoints: (builder) => ({
        fetchCMSContact: builder.query({
            query: (email) => ({
                url: `/cms/contact?email=${email}`,
                method: 'GET'
            }),
            transformResponse: (response: any ) => response?.cms_contact?.[0] || null,
            providesTags: ['contactCMSAPI']
        }),
        addCMSContact: builder.mutation({
            query: (data: LandingType) => ({
                url: '/cms/contact',
                method: 'POST',
                body: JSON.stringify(data)
            }),
            invalidatesTags: ['contactCMSAPI']
        }),
        updateCMSContact: builder.mutation({
            query: (data) => ({
                url: `/cms/contact/${data.id}`,
                method: 'PATCH',
                body: JSON.stringify(data)
            }),
            invalidatesTags: ['contactCMSAPI']
        })
    })
})

export const {
    useFetchCMSContactQuery,
    useAddCMSContactMutation,
    useUpdateCMSContactMutation
} = contactCMSAPI

export default contactCMSAPI