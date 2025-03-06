import {NextRequest} from "next/server";
import {deleteDoc, doc, getDoc, updateDoc} from "@firebase/firestore";
import {db} from "@/firebase/firebase";

type slugParams = {
    params: Promise<{
        id: string,
    }>
}

export async function GET(request: NextRequest, { params }: slugParams) {
    try {
        const id = (await params).id
        const docRef = doc(db, "blogs", id)
        const querySnapshot = await getDoc(docRef);
        let tempArr = null
        if (querySnapshot.exists()) {
            tempArr = querySnapshot.data()
        } else {
            return Response.json({ message: 'No blog found !', status: "FAILURE"})
        }

        return Response.json({ message: 'SUCCESS', status: "SUCCESS", data: tempArr})
    } catch (error: any) {
        return Response.json({
            status: 'FAILURE',
            message: (error as Error).message
        } )
    }
}


export async function PATCH(request: NextRequest, { params }: slugParams) {
    try {
        const id = (await params).id

        const docRef = doc(db, "blogs", id);
        const res = await request.json();

        await updateDoc(docRef, res);

        return Response.json({ message: 'successfully updated the blogs', status: "SUCCESS" })
    } catch (error: any) {
        return Response.json({
            status: 'FAILURE',
            message: (error as Error).message
        } )
    }
}

export async function DELETE(request: NextRequest, { params }: slugParams) {
    try {
        const id = (await params).id
        await deleteDoc(doc(db, "blogs", id));
        return Response.json({ message: 'successfully deleted a blog', status: "SUCCESS" })
    } catch (error: any) {
        return Response.json({
            status: 'FAILURE',
            message: (error as Error).message
        } )
    }
}