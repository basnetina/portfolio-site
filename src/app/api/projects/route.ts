import {NextRequest} from "next/server";
import {getServerSession} from "next-auth";
import {addDoc, collection, getDocs, where, query, orderBy, limit} from "firebase/firestore";
import {db} from "@/firebase/firebase";
import {Project, ProjectGet} from "@/types/ProjectInterface";

export async function GET(req: NextRequest){
    try {
        let querySnapshot;
        const qLanding = query(
            collection(db, "projects")
        );
        const searchParams = req.nextUrl.searchParams
        const emailParams = searchParams.get('email')
        const limitParams = searchParams.get('limit')

        if(emailParams && limitParams){
            const filterQuery = where(
                "created_by", "==", emailParams)

            console.log('uptoooo here', limitParams)

            if(limitParams){
                const limitNumber = parseInt(limitParams)
                querySnapshot = await getDocs(
                    query(
                        collection(db, "projects"),
                        filterQuery,
                        orderBy("created_at", "desc"),
                        limit(limitNumber)
                    )
                );
            } else{
                querySnapshot = await getDocs(
                    query(
                        collection(db, "projects"),
                        filterQuery,
                        orderBy("created_at", "desc")
                    )
                );
            }

        }
        else if(emailParams){
            const filterQuery = where(
                "created_by", "==", emailParams)
            querySnapshot = await getDocs(
                query(
                    collection(db, "projects"),
                    filterQuery,
                    orderBy("created_at", "desc"),
                )
            );
        } else {
            querySnapshot = await getDocs(qLanding);
        }

        const projects: ProjectGet[] = []
        querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
            projects.push({...doc.data(), id: doc.id})
        });

        return Response.json({
            status: 'SUCCESS',
            message: 'Data retrieved Successfully!',
            projects
        })
    } catch (e) {
        return Response.json({
            status: 'FAILURE',
            message: (e as Error).message,
        })
    }
}

export async function POST(req: NextRequest){
    try {
        const session = await getServerSession()
        if(!session){
            return Response.json({
                status: 'FAILURE',
                message:  "Please login to access this endpoint."
            })
        }

        const requestData: Project[] = await req.json();
        const userEmail = session?.user?.email

        const postData = {
            ...requestData,
            created_by: userEmail,
            created_at: new Date(),
            updated_at: new Date()
        }
        const newRef = await addDoc(collection(db, "projects"), postData)

        return Response.json({
            status: 'SUCCESS',
            message: 'Successfully save changes!',
            id: newRef.id
        })
    } catch (e) {
        return Response.json({
            status: 'FAILURE',
            message: (e as Error).message,
        })
    }
}
