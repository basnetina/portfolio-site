import { configureStore } from "@reduxjs/toolkit"
import landingAPI from "@/store/features/cms/landing";
import socialAPI from "@/store/features/cms/social";
import resumeAPI from "@/store/features/cms/resume";
import skillAPI from "@/store/features/cms/skills";
import projectsAPI from "@/store/features/projects";
import projectsTagAPI from "@/store/features/projects/tags";
import contactAPI from "@/store/features/contacts";
import contactCMSAPI from "@/store/features/cms/contact";
import educationAPI from "@/store/features/education";
import blogAPI from "@/store/features/blogs";

export const store = configureStore({
    reducer: {
        [landingAPI.reducerPath]: landingAPI.reducer,
        [socialAPI.reducerPath]: socialAPI.reducer,
        [resumeAPI.reducerPath]: resumeAPI.reducer,
        [skillAPI.reducerPath]: skillAPI.reducer,
        [projectsAPI.reducerPath]: projectsAPI.reducer,
        [projectsTagAPI.reducerPath]: projectsTagAPI.reducer,
        [contactAPI.reducerPath]: contactAPI.reducer,
        [contactCMSAPI.reducerPath]: contactCMSAPI.reducer,
        [educationAPI.reducerPath]: educationAPI.reducer,
        [blogAPI.reducerPath]: blogAPI.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(landingAPI.middleware)
            .concat(socialAPI.middleware)
            .concat(resumeAPI.middleware)
            .concat(skillAPI.middleware)
            .concat(projectsAPI.middleware)
            .concat(projectsTagAPI.middleware)
            .concat(contactAPI.middleware)
            .concat(contactCMSAPI.middleware)
            .concat(educationAPI.middleware)
            .concat(blogAPI.middleware)
    ,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
