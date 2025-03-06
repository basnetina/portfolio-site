import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
const baseUrl = process.env.NEXT_PUBLIC_API_URL

const resumeAPI = createApi({
    reducerPath: 'resumeAPI',
    baseQuery: fetchBaseQuery({
        baseUrl,
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('Accept', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['RESUME'],
    endpoints: (builder) => ({
        addResume: builder.mutation({
            query: (data) => ({
                url: '/upload/resume',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['RESUME'],
        }),
        fetchResume: builder.query({
            query: () => ({
                url: '/upload/resume',
            }),
            providesTags: ['RESUME']
        })
    })
})

export const {
    useAddResumeMutation,
    useFetchResumeQuery
} = resumeAPI

export default resumeAPI
