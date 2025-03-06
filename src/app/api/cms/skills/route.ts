import {NextRequest} from "next/server";
import {getServerSession, Session} from "next-auth";
import {addDoc, collection, getDocs, where, query, orderBy} from "firebase/firestore";
import {db} from "@/firebase/firebase";
import {ResumeType} from "@/types/types";
import {Skill, SkillGet} from "@/types/SkillsInterface";

export async function GET(req: NextRequest){
    try {
        let querySnapshot;
        const qLanding = query(
            collection(db, "cms_skills")
        );
        const searchParams = req.nextUrl.searchParams
        const emailParams = searchParams.get('email')

        if(emailParams){
            const filterQuery = where(
                "created_by", "==", emailParams);
            querySnapshot = await getDocs(
                query(
                    collection(db, "cms_skills"),
                    filterQuery,
                    orderBy("created_at", "desc")
                )
            );
        } else {
            querySnapshot = await getDocs(qLanding);
        }

        const resumeCMS: SkillGet[] = []
        querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
            resumeCMS.push({...doc.data(), id: doc.id})
        });

        return Response.json({
            status: 'SUCCESS',
            message: 'Data retrieved Successfully!',
            cms_skills: resumeCMS
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

        const requestData = await req.json();
        const userEmail = session?.user?.email

        const postData = {
            ...requestData,
            created_by: userEmail,
            created_at: new Date(),
            updated_at: new Date()
        }
        const newRef = await addDoc(collection(db, "cms_skills"), postData)

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
