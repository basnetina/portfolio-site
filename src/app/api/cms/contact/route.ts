import {NextRequest} from "next/server";
import {getServerSession} from "next-auth";
import {addDoc, collection, getDocs, where, query, orderBy} from "firebase/firestore";
import {db} from "@/firebase/firebase";
import {ContactCMSType, ContactCMSTypeEdit} from "@/types/ContactCMSType";

export async function GET(req: NextRequest){
    try {
        let querySnapshot;
        const qCMSContact = query(
            collection(db, "cms_contact")
        );
        const searchParams = req.nextUrl.searchParams
        const emailParams = searchParams.get('email')

        if(emailParams){
            const filterQuery = where(
                "created_by", "==", emailParams);
            querySnapshot = await getDocs(
                query(
                    collection(db, "cms_contact"),
                    filterQuery,
                    orderBy("created_at", "desc")
                )
            );
        } else {
            querySnapshot = await getDocs(qCMSContact);
        }

        const contactCMS: ContactCMSTypeEdit[] = []
        querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
            contactCMS.push({...doc.data(), id: doc.id})
        });

        return Response.json({
            status: 'SUCCESS',
            message: 'Data retrieved Successfully!',
            cms_contact: contactCMS
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

        const requestData: ContactCMSType[] = await req.json();
        const userEmail = session?.user?.email

        const postData = {
            ...requestData,
            created_by: userEmail,
            created_at: new Date(),
            updated_at: new Date()
        }
        const newRef = await addDoc(collection(db, "cms_contact"), postData)

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
