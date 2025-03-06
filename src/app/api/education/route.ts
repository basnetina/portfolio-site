import {NextRequest} from "next/server";
import {getServerSession} from "next-auth";
import {addDoc, collection, getDocs, where, query, orderBy} from "firebase/firestore";
import {db} from "@/firebase/firebase";
import {EducationType, EducationTypeEdit} from "@/types/EducationType";

export async function GET(req: NextRequest){
    try {
        let querySnapshot;
        const qEdu = query(
            collection(db, "education")
        );
        const searchParams = req.nextUrl.searchParams
        const emailParams = searchParams.get('email')

        if(emailParams){
            const filterQuery = where(
                "created_by", "==", emailParams);
            querySnapshot = await getDocs(
                query(
                    collection(db, "education"),
                    filterQuery,
                    orderBy("endYear", "desc")
                )
            );
        } else {
            querySnapshot = await getDocs(qEdu);
        }

        const education: EducationTypeEdit[] = []
        querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
            education.push({...doc.data(), id: doc.id})
        });

        return Response.json({
            status: 'SUCCESS',
            message: 'Data retrieved Successfully!',
            education
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

        const requestData: EducationType[] = await req.json();
        const userEmail = session?.user?.email

        const postData = {
            ...requestData,
            created_by: userEmail,
            created_at: new Date(),
            updated_at: new Date()
        }
        const newRef = await addDoc(collection(db, "education"), postData)

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
