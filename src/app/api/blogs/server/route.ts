import {NextRequest} from "next/server";
import { collection, getDocs, where, query, orderBy} from "firebase/firestore";
import {db} from "@/firebase/firebase";
import {BlogGet} from "@/types/BlogType";

export async function GET(req: NextRequest){
    try {
        let querySnapshot;
        const qLanding = query(
            collection(db, "blogs")
        );
        const searchParams = req.nextUrl.searchParams
        const emailParams = searchParams.get('email')

        if(emailParams){
            const filterQuery = where(
                "created_by", "==", emailParams);
            querySnapshot = await getDocs(
                query(
                    collection(db, "blogs"),
                    filterQuery,
                    orderBy("created_at", "desc")
                )
            );
        } else {
            querySnapshot = await getDocs(qLanding);
        }

        const blogs: BlogGet[] = []
        querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
            blogs.push({...doc.data(), id: doc.id})
        });

        return Response.json({
            status: 'SUCCESS',
            message: 'Data retrieved Successfully!',
            blogs: blogs?.map(blog=> {
                return {
                    ...blog,
                    content: undefined
                }
            })
        })
    } catch (e) {
        return Response.json({
            status: 'FAILURE',
            message: (e as Error).message,
        })
    }
}

