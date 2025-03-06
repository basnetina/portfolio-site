import {createApi} from "@reduxjs/toolkit/query/react"
import {baseQuery} from "@/store/features/baseQuery";

const contactAPI = createApi({
    reducerPath: 'contactAPI',
    baseQuery: baseQuery,
    tagTypes: ['contactAPI'],
    endpoints: (builder) => ({
        fetchContacts: builder.query({
            query: (email) => ({
                url: `/contacts?to=${process.env.NEXT_PUBLIC_MY_EMAIL}`,
                method: 'GET'
            }),
            providesTags: ['contactAPI'],
            transformResponse: (response: any ) => response.contacts || null
        }),
        addContact: builder.mutation({
            query: (data) => ({
                url: '/contacts',
                method: 'POST',
                body: JSON.stringify(data)
            }),
            invalidatesTags: ['contactAPI'],
        }),

    })
})



export const {
    useFetchContactsQuery,
    useAddContactMutation
} = contactAPI

export default contactAPI