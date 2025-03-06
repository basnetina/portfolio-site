import {NextRequest} from "next/server";
import {getServerSession} from "next-auth";
import {addDoc, collection, getDocs, where, query, orderBy} from "firebase/firestore";
import {db} from "@/firebase/firebase";

export async function GET(req: NextRequest){
    try {
        const session = await getServerSession()
        if(!session){
            return Response.json({
                status: 'FAILURE',
                message:  "Please login to access this endpoint."
            })
        }
        let querySnapshot;
        const qContacts = query(
            collection(db, "contacts")
        );

        const searchParams = req.nextUrl.searchParams
        const emailParams = searchParams.get('to')

        if(emailParams){
            const filterQuery = where(
                "contact_to", "==", emailParams);
            querySnapshot = await getDocs(
                query(
                    collection(db, "contacts"),
                    filterQuery,
                    orderBy("created_at", "desc")
                )
            );
        } else {
            querySnapshot = await getDocs(qContacts);
        }

        const contacts: any[] = []
        querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
            contacts.push({...doc.data(), id: doc.id})
        });

        return Response.json({
            status: 'SUCCESS',
            message: 'Data retrieved Successfully!',
            contacts
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
        const requestData = await req.json();
        const postData = {
            ...requestData,
            created_at: new Date(),
            updated_at: new Date()
        }
        const newRef = await addDoc(collection(db, "contacts"), postData)

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
